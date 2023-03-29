"use client";
import UserForm from "@/components/Forms/UserForm";
import { ToastError, ToastSuccess } from "@/components/Toasts/Toasts";
import { updateUser } from "@/services/user";
import prisma from "@/utils/prisma";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Dashboard = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (user: Partial<User>) => {
      return updateUser(user);
    },
    onError: () => {
      ToastError("Failed to update your details");
    },
    onSuccess: () => {
      ToastSuccess("Updated your details");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleUpdateUser = (user: Partial<User>) => {
    setLoading(true);
    mutation.mutate(user);
  };

  return (
    <div className="md:w-[70%] w-full space-y-3 ">
      <h3 className="text-2xl text-zinc-800 dark:text-zinc-100 font-serif my-2">
        Details
      </h3>
      <p className="dark:text-zinc-100 text-sm text-zinc-700">
        These details that will be shown to people who visits your page
      </p>
      <p className="w-full border-none dark:border-none text-sm  px-1 py-2 dark:bg-inherit outline-none  dark:text-zinc-300 text-zinc-700">
        {"@" + user?.username ?? ""}
      </p>
      <UserForm handleSubmit={handleUpdateUser} user={user} state={loading} />
      {/* <input
        name="name"
        type={"text"}
        value={userInfo.name}
        className="w-full  px-3 py-2 dark:bg-zinc-600 outline-none border dark:border-none text-sm dark:text-gray-100 text-gray-700 border-zinc-600"
        onChange={handleInput}
        placeholder="Your name"
      />
      <input
        type={"text"}
        onChange={handleInput}
        name="role"
        value={userInfo.role}
        className="w-full  px-3 py-2 dark:bg-zinc-600 outline-none border dark:border-none text-sm dark:text-gray-100 text-gray-700 border-zinc-600"
        placeholder="Your role, e.g Software Engineer"
      />
      <div className="relative flex">
        <textarea
          value={userInfo.bio}
          onChange={handleInput}
          name="bio"
          className="w-full border-zinc-600 px-3 py-3 dark:bg-zinc-600 resize-none outline-none border dark:border-none text-sm dark:text-gray-100 text-gray-700 focus:peer-disabled:block peer "
          placeholder="Bio"
          rows={10}
        ></textarea>
        <button className="peer-focus:block hidden absolute bottom-2 right-2 px-2 py-2 text-sm bg-primary">
          Generate bio
        </button>
      </div>
      <button
        onClick={handleUpdateUser}
        disabled={loading}
        className="text-gray-900 px-3 py-2 capitalize text-sm bg-primary  w-44 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed"
      >
        Save
      </button> */}
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

    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });

    let newUser: User | unknown;
    newUser = { ...user, publishedAt: user?.publishedAt.toString() };

    return {
      props: { user: newUser },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
export default Dashboard;
