import useDebounce from "@/hooks/useDebounce";
import { axiosClient } from "@/utils/axios";
import client from "@/utils/prisma";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Identifier = () => {
  const [username, setUsername] = useState<string>("");
  const [exists, setExists] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(username, 500);
  const router = useRouter();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };

  const verifyUsername = async () => {
    try {
      const { data } = await axiosClient().get("/user/username", {
        params: {
          username,
        },
      });
      setExists(data.exists);
    } catch (error) {
      setExists(false);
    }
  };

  const handleAddUsername = async () => {
    if (username.length < 3) {
      console.log("Username cannot be less than 3 characters");
      return;
    }
    try {
      const { data } = await axiosClient().post("/user/username", {
        username,
      });
      if (data.success) {
        router.push("/admin");
      }
    } catch (error) {
      setExists(false);
    }
  };

  useEffect(() => {
    verifyUsername();
  }, [debouncedValue]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center space-y-2 dark:bg-background text-gray-100">
      <h1 className="text-5xl font-bold font-serif">WhatIBuilt</h1>
      <br />
      <small className="w-80 text-center text-sm">
        This is how people will discover your account. For example,
        <span className="text-primary">
          whatibuilt.com/{username || "yourname"}
        </span>
      </small>
      <input
        type={"text"}
        value={username}
        required
        onChange={handleUsername}
        className="border dark:bg-zinc-600 rounded-lg text-xs border-zinc-300 px-3 py-3 w-80 md:w-96 dark:border-none outline-none focus:border-zinc-300 "
        placeholder="Username"
      />
      {exists && (
        <p className="transition-all text-left flex text-sm w-80 md:w-96 text-red-400">
          {username} already exists
        </p>
      )}
      <button
        onClick={handleAddUsername}
        className="px-3 py-3 bg-primary font-semibold hover:cursor-pointer w-80 md:w-96 text-center  hover:bg-primary transition-colors rounded-lg text-xs text-zinc-200"
      >
        Finish
      </button>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }

  const user = await client.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });
  if (user?.username) {
    return { redirect: { destination: "/admin/" } };
  }

  return {
    props: { username: [] },
  };
}

export default Identifier;
