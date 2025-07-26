import { useEffect, useState } from "react";

const ProgressView = ({ data }) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setProgress(data?.percentage || 0);
      }, 100);
      return () => clearTimeout(timeout);
    }, [data]);
  
    return (
      <div className="py-3 px-4 bg-white rounded-2xl shadow-md space-y-2 w-full transition-all duration-500 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-base font-semibold text-font_primary">{data?.type}</p>
            <span className="text-xl">{data?.icon}</span>
          </div>
          <p className="text-icon font-medium">{data?.value}</p>
        </div>
  
        <div className="w-full h-3 bg-field_primary rounded-full overflow-hidden">
          <div
            className="h-full bg-red-700 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };
  export default ProgressView