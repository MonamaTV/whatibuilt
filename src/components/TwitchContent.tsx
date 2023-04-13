import Image from "next/image";
import React from "react";

const TwitchContent = () => {
  return (
    <div className="w-full">
      <h3 className="text-2xl text-gray-500 dark:text-rose-100 font-serif my-2">
        Twitch
      </h3>
      <div className="flex flex-row overflow-x-hidden gap-x-2 w-full">
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={"50"} alt="Tag" />
          <p className="px-2 text-white text-sm capitalize my-1 object-contain">
            How to delete FNB
          </p>
          <small className="px-2 text-white text-xs flex items-center my-1 mb-2">
            30,000 views
          </small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
      </div>
    </div>
  );
};

export default TwitchContent;
