const DietProgress = () => (
  <div>
    <h2 className="text-base font-semibold mb-2">Diet Progress</h2>
    <div className="w-full h-24 bg-gray-100 rounded-xl flex items-end">
      <div className="w-1/6 h-1/3 bg-red-400"></div>
      <div className="w-1/6 h-2/5 bg-red-300"></div>
      <div className="w-1/6 h-1/2 bg-red-200"></div>
      <div className="w-1/6 h-2/3 bg-red-300"></div>
      <div className="w-1/6 h-3/4 bg-red-600 relative">
        <span className="absolute -top-5 text-xs font-bold text-red-600 left-1/2 -translate-x-1/2">Fri</span>
      </div>
      <div className="w-1/6 h-2/5 bg-red-200"></div>
    </div>
    <p className="text-xs text-red-500 mt-1">40%</p>
  </div>
);

export default DietProgress;
