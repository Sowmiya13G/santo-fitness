import { FaPlay } from "react-icons/fa";

const AudioPlayer = () => (
  <div className="mt-3 flex items-center space-x-3 bg-red-600 p-2 rounded-full text-white">
    <FaPlay size={20} />
    <div className="flex-1 bg-white h-1 rounded-full">
      <div className="w-2/3 h-1 bg-red-600 rounded-full"></div>
    </div>
    <span className="text-xs">0:09</span>
  </div>
);

export default AudioPlayer;
