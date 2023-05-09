import Meta from "@/components/Meta";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Home = () => {
  const session = useSession();
  return (
    <div className="mx-auto dark:bg-background min-h-screen">
      <Meta />
      <nav className="container mx-auto px-10 flex flex-row justify-between py-3 items-center">
        <Link
          className="dark:text-zinc-200 text-zinc-800 font-serif font-bold text-lg"
          href="/"
        >
          WhatIBuilt
        </Link>
        <ul className="flex flex-row justify-between items-center gap-x-4">
          <li className="md:px-10 px-2 py-2 hover:bg-primary hover:text-zinc-200 rounded-lg text-sm">
            <Link
              href={
                session.status === "authenticated" ? "/admin" : "/auth/login"
              }
            >
              {session.status === "authenticated" ? "Dashboard" : "Login"}
            </Link>
          </li>
        </ul>
      </nav>

      <section className="w-screen md:mt-52 mt-32 flex  flex-col justify-center items-center dark:text-zinc-200 text-zinc-900 gap-y-3 text-center">
        <h1 className="md:text-8xl sm:text-6xl text-7xl font-extrabold my-1 text-center flex flex-col md:flex-row ">
          <span>Create. </span> <span className="text-primary"> Publish.</span>
          <span>Simple.</span>
        </h1>
        <p className="text-center px-10">
          You can create a dev portfolio with so much ease. Put all your content
          from different platforms in one place
        </p>
        <Link
          href={session.status === "authenticated" ? "/admin" : "/auth/login"}
          className="bg-gradient-to-br from-background via-background to-primary text-zinc-200 px-10 py-2 rounded-lg shadow  hover:from-primary hover:via-background hover:to-background transition-all duration-700 w-56 dark:from-primary dark:via-primary dark:to-background"
        >
          {session.status === "authenticated"
            ? "Dashboard"
            : "Create portfolio"}
        </Link>
      </section>
    </div>
  );
};

export default Home;
