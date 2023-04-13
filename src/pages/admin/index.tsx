"use client";
import UserForm from "@/components/Forms/UserForm";
import { ToastError, ToastSuccess } from "@/components/Toasts/Toasts";
import { updateUser } from "@/services/user";
import prisma from "@/utils/prisma";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Dashboard = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

  if (!user) return null;
  const newUser = JSON.parse(user) as User;
  return (
    <div className="md:w-[70%] w-full space-y-3 ">
      <h3 className="text-2xl text-zinc-800 dark:text-zinc-100 font-serif my-2">
        Details
      </h3>
      <p className="dark:text-zinc-100 text-sm text-zinc-700">
        These details that will be shown to people who visits your page
      </p>
      <p className="w-full border-none dark:border-none text-sm  px-1 py-2 dark:bg-inherit outline-none  dark:text-zinc-300 text-zinc-700">
        {"@" + newUser?.username ?? ""}
      </p>
      <UserForm
        handleSubmit={handleUpdateUser}
        user={newUser}
        state={loading}
      />
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

    return {
      props: { user: JSON.stringify(user) },
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

// careers@quarphix.co.za
