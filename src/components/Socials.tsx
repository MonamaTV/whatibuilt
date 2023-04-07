import React from "react";

const Platforms = () => {
  return (
    <div className="border-dashed w-full md:w-[900px] h-[600px] flex flex-col  space-y-3  justify-center items-center border-primary rounded-lg dark:bg-background bg-zinc-200 px-3">
      <h2 className="text-2xl text-zinc-800 dark:text-zinc-100 font-serif px-4 py-3">
        Add more platforms
      </h2>

      <input
        type="text"
        className="border outline-none dark:border-none border-zinc-100 text-sm rounded-lg px-4 py-2 md:mx-10 w-full mx-2 md:w-2/5"
        placeholder="Enter your Hashnode username"
      />
      <button className="border outline-none dark:border-none border-zinc-100 text-sm rounded-lg px-4 py-2 md:mx-10 w-full mx-4 md:w-2/5 bg-primary text-zinc-200">
        Add
      </button>
    </div>
  );
};

export default Platforms;
