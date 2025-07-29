import React, { useRef, useState, useEffect } from "react";
import { FaMicrophone, FaStop, FaPlay, FaTrash } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

const AudioRecorderInput = ({ name = "audio" }) => {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformData, setWaveformData] = useState([]);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const barWidth = 3;
  const gap = 1;

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
      ctx.fillStyle = i / bars <= playedRatio ? "#8E8E93" : "#FFF";
  
      ctx.moveTo(x, centerY - barHeight + radius);
      ctx.arcTo(x, centerY - barHeight, x + barWidth, centerY - barHeight, radius);
      ctx.arcTo(x + barWidth, centerY - barHeight, x + barWidth, centerY - barHeight + radius, radius);
      ctx.lineTo(x + barWidth, centerY + barHeight - radius);
      ctx.arcTo(x + barWidth, centerY + barHeight, x, centerY + barHeight, radius);
      ctx.arcTo(x, centerY + barHeight, x, centerY + barHeight - radius, radius);
  
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

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioBlob(blob);
      setAudioUrl(url);
      setValue(name, blob);
      clearErrors(name);

      const buffer = await blob.arrayBuffer();
      const audioCtx = new AudioContext();
      const decoded = await audioCtx.decodeAudioData(buffer);
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

  return (
    <div className="space-y-2">
      <div
        className={`${
          audioUrl
            ? " text-white shadow-lg"
            : " text-gray-700"
        } rounded-2xl px-4 h-14 w-full flex flex-col gap-3 bg-primary-gradient`}
      >
        <div className="flex  h-14 items-center justify-between gap-4">
          {!audioUrl && !isRecording && (
            <button onClick={startRecording}>
              <FaMicrophone />
            </button>
          )}

          {isRecording && (
            <button onClick={stopRecording} className="animate-pulse">
              <FaStop />
            </button>
          )}

          {audioUrl && !isRecording && (
            <div className="flex items-center gap-4 w-full">
              <button onClick={playAudio} className="flex-shrink-0">
                {isPlaying ? <FaStop /> : <FaPlay />}
              </button>

              <canvas
                ref={canvasRef}
                width={275}
                height={50}
                className=""
              />

              <button onClick={deleteRecording} className="flex-shrink-0">
                <FaTrash />
              </button>
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
