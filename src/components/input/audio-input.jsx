import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaMicrophone, FaPlay, FaStop, FaTrash } from "react-icons/fa";

const AudioRecorderInput = ({ name = "audio", value = null }) => {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformData, setWaveformData] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const readonlyMode = !!value;
  const barWidth = 3;
  const gap = 1;

  useEffect(() => {
    if (!value || audioBlob || audioUrl) return;

    const fetchAndProcessAudio = async () => {
      try {
        const response = await fetch(value);
        const blob = await response.blob();
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const arrayBuffer = await blob.arrayBuffer();
        const decoded = await audioContext.decodeAudioData(arrayBuffer);

        const rawData = decoded.getChannelData(0);
        const samples = Math.floor(275 / (barWidth + gap));
        const blockSize = Math.floor(rawData.length / samples);
        const waveform = new Array(samples).fill(0).map((_, i) => {
          const block = rawData.slice(i * blockSize, (i + 1) * blockSize);
          const sum = block.reduce((acc, val) => acc + Math.abs(val), 0);
          return Math.floor((sum / block.length) * 255);
        });

        setWaveformData(waveform);
        setAudioUrl(value);
      } catch (err) {
        console.error("Error loading external audio", err);
      }
    };

    fetchAndProcessAudio();
  }, [value, audioBlob, audioUrl]);

  const convertToMp3 = async (webmBlob) => {
    try {
      setIsConverting(true);
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      const arrayBuffer = await webmBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );
      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      source.start(0);

      const renderedBuffer = await offlineContext.startRendering();
      const wavBlob = audioBufferToWav(renderedBuffer);
      const mp3Blob = new Blob([wavBlob], { type: "audio/mp3" });

      setIsConverting(false);
      return mp3Blob;
    } catch (error) {
      console.error("Error converting to MP3:", error);
      setIsConverting(false);
      return webmBlob;
    }
  };

  const audioBufferToWav = (buffer) => {
    const length = buffer.length;
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(arrayBuffer);

    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, "RIFF");
    view.setUint32(4, 36 + length * numberOfChannels * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, length * numberOfChannels * 2, true);

    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(
          -1,
          Math.min(1, buffer.getChannelData(channel)[i])
        );
        view.setInt16(
          offset,
          sample < 0 ? sample * 0x8000 : sample * 0x7fff,
          true
        );
        offset += 2;
      }
    }

    return arrayBuffer;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioUrl]);

  const drawWaveform = (data, playedRatio = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = 3;
    const gap = 1;
    const bars = data.length;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    data.forEach((value, i) => {
      const x = i * (barWidth + gap);
      const barHeight = (value / 255) * (height / 2);
      const radius = barWidth / 2;

      ctx.beginPath();
      ctx.fillStyle = i / bars <= playedRatio ? "#ddd" : "#FFF";

      ctx.moveTo(x, centerY - barHeight + radius);
      ctx.arcTo(
        x,
        centerY - barHeight,
        x + barWidth,
        centerY - barHeight,
        radius
      );
      ctx.arcTo(
        x + barWidth,
        centerY - barHeight,
        x + barWidth,
        centerY - barHeight + radius,
        radius
      );
      ctx.lineTo(x + barWidth, centerY + barHeight - radius);
      ctx.arcTo(
        x + barWidth,
        centerY + barHeight,
        x,
        centerY + barHeight,
        radius
      );
      ctx.arcTo(
        x,
        centerY + barHeight,
        x,
        centerY + barHeight - radius,
        radius
      );

      ctx.closePath();
      ctx.fill();
    });
  };

  useEffect(() => {
    if (!isPlaying || !audioRef.current) return;

    const interval = setInterval(() => {
      const audio = audioRef.current;
      const ratio = audio.currentTime / audio.duration;
      drawWaveform(waveformData, ratio);
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, waveformData]);

  useEffect(() => {
    if (waveformData.length > 0) drawWaveform(waveformData, 0);
  }, [waveformData]);
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 👇 Start live waveform drawing
    const drawLiveWaveform = () => {
      if (!isRecording) return; // stop drawing if not recording

      analyser.getByteTimeDomainData(dataArray);

      // Use every 2nd value to reduce bars for better performance
      const simplifiedData = Array.from(dataArray).filter(
        (_, i) => i % 2 === 0
      );
      setWaveformData(simplifiedData);
      drawWaveform(simplifiedData);
      requestAnimationFrame(drawLiveWaveform);
    };

    drawLiveWaveform(); // start the loop

    recorder.ondataavailable = (e) => chunks.push(e.data);

    recorder.onstop = async () => {
      const webmBlob = new Blob(chunks, { type: "audio/webm" });

      const mp3Blob = await convertToMp3(webmBlob);
      const url = URL.createObjectURL(mp3Blob);

      setAudioBlob(mp3Blob);
      setAudioUrl(url);
      setValue(name, mp3Blob);
      clearErrors(name);

      // (Optional) Generate waveform for playback
      const buffer = await webmBlob.arrayBuffer();
      const decoded = await audioContext.decodeAudioData(buffer);
      const rawData = decoded.getChannelData(0);
      const samples = Math.floor(275 / (barWidth + gap));
      const blockSize = Math.floor(rawData.length / samples);
      const waveform = new Array(samples).fill(0).map((_, i) => {
        const block = rawData.slice(i * blockSize, (i + 1) * blockSize);
        const sum = block.reduce((acc, val) => acc + Math.abs(val), 0);
        return Math.floor((sum / block.length) * 255);
      });
      setWaveformData(waveform);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setWaveformData([]);
    setValue(name, null);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="space-y-2 relative">
      <div
        className={`${
          audioUrl ? " text-white shadow-lg" : " text-gray-200"
        } rounded-2xl px-4 h-14 w-full flex flex-col gap-3 bg-secondary`}
      >
        <div className="flex h-14 items-center justify-between gap-4">
          {!readonlyMode && !audioUrl && !isRecording && !isConverting && (
            <button type="button" onClick={startRecording}>
              <FaMicrophone color="white" />
            </button>
          )}

          {isRecording && (
            <button
              type="button"
              onClick={stopRecording}
              className="animate-pulse"
            >
              <FaStop color="white" />
            </button>
          )}

          {isConverting && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="text-white text-sm">Converting to MP3...</span>
            </div>
          )}
          {!readonlyMode && isRecording && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="text-white text-sm">Recording...</span>
            </div>
          )}

          {readonlyMode && audioUrl && !isRecording && !isConverting && (
            <div className="flex items-center gap-4 w-full">
              <button
                type="button"
                onClick={playAudio}
                className="flex-shrink-0"
              >
                {isPlaying ? (
                  <FaStop color="white" />
                ) : (
                  <FaPlay color="white" />
                )}
              </button>

              <canvas ref={canvasRef} width={275} height={50} className="" />

              <span className="text-white text-xs  text-left absolute bottom-0">
                {formatTime(isPlaying ? currentTime : duration)}
              </span>
              {!readonlyMode && (
                <button
                  type="button"
                  onClick={deleteRecording}
                  className="flex-shrink-0"
                >
                  <FaTrash color="white" />
                </button>
              )}
            </div>
          )}
        </div>
        {audioUrl && <audio ref={audioRef} src={audioUrl} hidden />}
      </div>

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default AudioRecorderInput;
