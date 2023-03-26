import TwitchContent from "@/components/TwitchContent";
import YouTubeContent from "@/components/YouTubeContent";
import React from "react";

const Integrations = () => {
  return (
    <div className="md:w-[60%] w-full space-y-3">
      <h3 className="text-2xl text-zinc-800 dark:text-rose-100 font-serif my-2">
        Integrations
      </h3>
      <p className="dark:text-gray-100 text-zinc-700 text-sm">
        Now you can only integrate your YouTube channel, Twitch and GitHub
        accounts
      </p>

      <div className="flex flex-col md:flex-row gap-2">
        <button className="px-3 py-2 capitalize text-sm  bg-purple-800 text-gray-100 w-full ">
          Connect Your Twitch
        </button>
        <button className="px-3 py-2 capitalize text-sm  bg-red-700 text-gray-100 w-full ">
          Connect Your YouTube channel
        </button>
        <button className="px-3 py-2 capitalize text-sm  bg-zinc-600 text-gray-100 w-full ">
          Connect Your GitHub account
        </button>
      </div>
      <YouTubeContent />
      <TwitchContent />

      {/* Connected content */}
    </div>
  );
};

export default Integrations;
