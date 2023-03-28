import Uploader from "@/components/Uploader";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]";

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="h-screen w-screen text-zinc-800 mx-auto flex flex-col justify-center items-center space-y-3 dark:bg-background">
      <h1 className="text-5xl font-bold font-serif dark:text-zinc-100">
        WhatIBuilt
      </h1>
      <br />
      <p className="px-10 text-center dark:text-zinc-100">
        Continue with your quick dev portfolio
      </p>
      {providers &&
        Object.values(providers).map((provider) => (
          <div
            key={provider.id}
            onClick={() => signIn(provider.id)}
            className="text-zinc-800 px-3 py-3 border border-zinc-300 dark:text-zinc-100 hover:cursor-pointer w-80 md:w-96 text-center text-sm flex items-center space-x-2 justify-center hover:bg-zinc-50 mr-10 ml-10 hover:text-zinc-900"
          >
            <Image
              src={`/${provider.name}.svg`}
              height={15}
              width={15}
              alt="Logo"
            />
            <span>Continue With {provider.name}</span>
          </div>
        ))}
      <div className="text-left flex text-sm w-80 md:w-96 justify-center text-zinc-400">
        <Link
          className="text-left flex text-sm hover:underline"
          href={"/auth/register"}
        >
          Don&apos;t have an account? Sign up{" "}
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/admin", permanent: false } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

export default Login;
