import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { youtubeClient, youtubeTokenClient } from "@/utils/axios";
import prisma from "@/utils/prisma";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import React from "react";

const YouTube = () => {
  return (
    <div className="dark:bg-background mx-auto min-h-screen w-full flex flex-col justify-center items-center gap-2">
      <h3 className="text-3xl text-zinc-800 dark:text-zinc-100 font-serif">
        Unsuccessful
      </h3>
      <p className="text-zinc-100 text-sm">
        Failed to integrate with YouTube. Please try again...
      </p>
      <div className="flex  flex-row w-42 gap-x-2">
        <button className="px-3 py-2 capitalize text-sm  text-red-800  w-full ">
          Go back home
        </button>
        <button className="w-32 px-2 py-2 capitalize text-sm  bg-red-700 text-gray-100  ">
          Try again
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const code = context.query.code;
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!session) {
      return { redirect: { destination: "/auth/login", permanent: false } };
    }
    if (!code) {
      return {
        redirect: { destination: "/admin/integrations", permanent: false },
      };
    }
    const uri =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/admin/integrations/youtube"
        : process.env.GOOGLE_REDIRECT_URI;
    const { data } = await youtubeTokenClient().post("", {
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: uri,
    });

    const { access_token } = data;
    const { data: youtubeData } = await youtubeClient().get("", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

    const youtubeChannelId: string = youtubeData.items[0].id;

    const channel = await prisma.channels.upsert({
      where: {
        userID: session?.user?.id,
      },
      update: {
        youtubeId: youtubeChannelId,
      },
      create: {
        youtubeId: youtubeChannelId,
        userID: session.user?.id!,
      },
    });
    if (channel) {
      return {
        redirect: { destination: "/admin/integrations", permanent: false },
      };
    }

    return {
      props: { data: [] },
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

export default YouTube;
