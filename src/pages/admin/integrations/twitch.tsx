import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { twitchTokenClient } from "@/utils/axios";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import React from "react";

const Twitch = () => {
  return (
    <div className="dark:bg-background mx-auto min-h-screen w-full flex flex-col justify-center items-center gap-3">
      <h3 className="text-4xl text-zinc-800 dark:text-zinc-100 font-serif">
        Unsuccessful
      </h3>
      <p className="dark:text-zinc-100 text-sm text-zinc-700">
        Failed to integrate with Twitch. Please try again...
      </p>
      <div className="flex  flex-row w-42 gap-x-2">
        <button className="px-3 py-2 capitalize text-sm  text-purple-800  w-full ">
          Go back home
        </button>
        <button className="w-32 px-2 py-2 capitalize text-sm  bg-purple-800 text-gray-100  ">
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

    if (code) {
      const uri =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/admin/integrations/youtube"
          : process.env.TWITCH_REDIRECT_URI;
      const { data } = await twitchTokenClient().post("", {
        code: code,
        grant_type: "authorization_code",
        redirect_uri: uri,
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
      });

      const { access_token } = data;
    }

    return {
      props: { data: [] },
    };
  } catch (error: any) {
    console.log(error);
    return {
      props: { data: [] },
    };
    // return { redirect: { destination: "/auth/login", permanent: false } };
  }
}

export default Twitch;
