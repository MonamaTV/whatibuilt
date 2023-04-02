import GitHubContent from "@/components/GitHubContent";
import YouTubeContent from "@/components/YouTubeContent";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Channels } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import prisma from "../../../utils/prisma";

const Integrations = ({ channels }: { channels: Channels }) => {
  return (
    <div className="md:w-[70%] w-full space-y-3 ">
      <h3 className="text-2xl text-zinc-800 dark:text-zinc-100 font-serif my-2">
        Integrations
      </h3>
      <p className="dark:text-gray-100 text-zinc-700 text-sm">
        Now you can only integrate your YouTube channel, Twitch and GitHub
        accounts
      </p>

      <div className="flex flex-col md:flex-row gap-2">
        {!channels?.twitchId && (
          <Link
            href="/api/twitch"
            className="text-center px-3 py-2 capitalize text-sm  bg-[#9146FF] text-zinc-100 rounded-lg"
          >
            Connect Your Twitch
          </Link>
        )}
        {!channels?.youtubeId && (
          <Link
            href="/api/youtube"
            className="px-3 py-2 capitalize text-sm  bg-[#FF0000] text-zinc-100 text-center  rounded-lg"
          >
            Connect Your YouTube
          </Link>
        )}
        {!channels?.githubId && (
          <Link
            href={"/api/github"}
            className="text-center px-3 py-2 capitalize text-sm  bg-zinc-600 text-zinc-100 rounded-lg"
          >
            Connect Your GitHub
          </Link>
        )}
      </div>
      {channels?.githubId && <GitHubContent githubId={channels?.githubId} />}
      {channels?.youtubeId && (
        <YouTubeContent channelId={channels?.youtubeId} />
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!session) {
      return { redirect: { destination: "/auth/login", permanent: false } };
    }

    const channels = await prisma.channels.findUnique({
      where: {
        userID: session?.user?.id,
      },
    });

    return {
      props: { channels },
    };
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    return {
      props: { data: [] },
    };
    // return { redirect: { destination: "/auth/login", permanent: false } };
  }
}

export default Integrations;
