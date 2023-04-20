import React from "react";

const Platforms = () => {
  return (
    <div className="border-dashed w-full md:w-[900px] h-[600px] flex flex-col  space-y-3  justify-center items-center border-primary rounded-lg dark:bg-background bg-zinc-200 px-3">
      <h2 className="text-2xl text-zinc-800 dark:text-zinc-100 font-serif px-4 py-3">
        Add more platforms
      </h2>

      <div className="flex flex-row justify-center md:w-2/5 md:mx-10 w-full mx-4">
        <input
          type="text"
          className="border w-2/3 outline-none dark:border-none border-zinc-100 text-sm rounded-lg px-4 py-2 rounded-r-none "
          placeholder="Hashnode username"
        />
        <span className="px-4 py-2 border text-sm rounded-l-none dark:border-zinc-700 rounded-lg dark:bg-inherit bg-zinc-200 text-zinc-500 dark:text-zinc-200 border-zinc-100">
          .hashnode.dev
        </span>
      </div>
      <div className="flex flex-row justify-center md:w-2/5 md:mx-10 w-full mx-4">
        <span className="px-4 py-2 border text-sm rounded-r-none dark:border-zinc-700 rounded-lg dark:bg-inherit bg-zinc-200 text-zinc-500 dark:text-zinc-200 border-zinc-100">
          https://dev.to/
        </span>
        <input
          type="text"
          className="border w-2/3 outline-none dark:border-none border-zinc-100 text-sm rounded-lg px-4 py-2 rounded-l-none "
          placeholder="Dev username"
        />
      </div>
      <button className="border outline-none dark:border-none border-zinc-100 text-sm rounded-lg px-4 py-2 md:mx-10 w-full mx-4 md:w-2/5 bg-primary text-zinc-200">
        Add
      </button>
    </div>
  );
};

export default Platforms;
