import React from "react";

const TopButtons = () => {
  return (
    <div class="flex p-4 gap-1">
      <div class="">
        <span class="bg-red-500 inline-block center w-3 h-3 rounded-full hover:scale-110 hover:bg-red-400 transition-all duration-200"></span>
      </div>
      <div class="circle">
        <span class="bg-yellow-500 inline-block center w-3 h-3 rounded-full hover:scale-110 hover:bg-yellow-400 transition-all duration-200"></span>
      </div>
      <div class="circle">
        <span class="bg-green-500 box inline-block center w-3 h-3 rounded-full hover:scale-110 hover:bg-green-400 transition-all duration-200"></span>
      </div>
    </div>
  );
};

export default TopButtons;
