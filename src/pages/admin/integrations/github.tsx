import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { githubClient, githubTokenClient } from "@/utils/axios";
import prisma from "@/utils/prisma";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import React from "react";

const GitHub = () => {
  return (
    <div className="dark:bg-background mx-auto min-h-screen w-full flex flex-col justify-center items-center gap-2">
      <h3 className="text-3xl text-zinc-800 dark:text-zinc-100 font-serif">
        Unsuccessful
      </h3>
      <p className="text-zinc-100 text-sm">
        Failed to integrate with GitHub. Please try again...
      </p>
      <div className="flex  flex-row w-42 gap-x-2">
        <button className="px-3 py-2 capitalize text-sm  text-zinc-300  w-full ">
          Go back home
        </button>
        <button className="w-32 px-2 py-2 capitalize text-sm  bg-zinc-800 text-gray-100  ">
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
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    if (!code) {
      return {
        redirect: { destination: "/admin/integrations", permanent: false },
      };
    }
    const { data } = await githubTokenClient().post("", {
      code: code,
      redirect_uri: process.env.GITHUB_REDIRECT_URI,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    });

    const isEligible = data
      .split("access_token=")[1]
      .split("&")[0]
      .startsWith("ghu_");
    if (!isEligible) {
      throw new Error("Failed to authenticate");
    }
    const access_token = data.split("access_token=")[1].split("&")[0];
    const res = await githubClient().get("/user", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

    const login = res.data.login;
    const save = await prisma.channels.upsert({
      where: {
        userID: session?.user?.id!,
      },
      update: {
        githubId: login,
      },
      create: {
        userID: session?.user?.id!,
        githubId: login,
      },
    });

    if (save) {
      return {
        redirect: { destination: "/admin/integrations", permanent: false },
      };
    }

    return {
      props: { data: [] },
    };
  } catch (error: any) {
    console.log(error);
    return {
      props: { data: [] },
    };
  }
}

export default GitHub;
