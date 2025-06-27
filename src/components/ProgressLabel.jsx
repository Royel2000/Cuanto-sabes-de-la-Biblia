const ProgressLabel = ({ progress }) => {
  return (
    <div>
      <span
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow="50"
        className="block rounded-full bg-zinc-800"
      >
        <span
          className={`block h-4 rounded-full bg-slate-600 text-center text-[14px]/4  
            ${
              progress == 100 ? "w-[100%]" : progress >= 90 ? "w-[90%]" : progress >= 80 ? "w-[80%]" : progress >= 70 ? "w-[70%]" : progress >= 60 ? "w-[60%]" : progress >= 50 ? "w-[50%]" : progress >= 40 ? "w-[40%]" : progress >= 30 ? "w-[30%]" : progress >= 20 ? "w-[20%]" : progress >= 10 ? "w-[10%]" : "w-[0%]"
            }`}
        >
          <span className="text-white"> {progress}% </span>
        </span>
      </span>
    </div>
  );
};

export default ProgressLabel;
