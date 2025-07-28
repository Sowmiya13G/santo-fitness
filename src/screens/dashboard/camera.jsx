import ProgressScreen from "../progress/progress";

const Camera = () => {
  return (
    <div className="min-h-[90%]  max-h-full relative bg-white w-screen overflow-scroll  hide-scrollbar">
      <ProgressScreen />
      
    </div>
  );
};

export default Camera;
