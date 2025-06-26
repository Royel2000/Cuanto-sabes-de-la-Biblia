import React, { useEffect, useState } from "react";

const Clock = ({ minutos, segundos }) => {
  const [minutes, setMinutes] = useState(minutos);
  const [seconds, setSeconds] = useState(segundos);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="flex gap-3 text-center items-center justify-center my-2">
      <div
        className={`dark:text-slate-100 w-[80%] rounded-[30px] px-5 py-2
        font-medium  transition-all
        ${seconds <= 3 ? "bg-red-500" : "dark:bg-slate-600 bg-slate-200"}
      `}
      >
        <div>
          {minutes === 0 && seconds === 0 ? (
            <h1>Time out</h1>
          ) : (
            <h1>
              {" "}
              {minutes}:{seconds}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clock;
