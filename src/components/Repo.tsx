import { Repos } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Repo = ({ repo }: { repo: Repos }) => {
  return (
    <div
      key={repo.id}
      className="w-72 p-3 px-4 h-40 flex flex-shrink-0 flex-col border dark:border-zinc-700 border-zinc-200 rounded-lg gap-y-1 shadow-md"
    >
      <Image
        src="/Github.svg"
        width={"30"}
        height={"30"}
        className="block p-1 dark:bg-zinc-700 bg-zinc-100 rounded-md"
        alt="Github repo"
      />
      <p className="dark:text-zinc-200 text-zinc-800 text-lg flex flex-row items-center gap-x-2">
        <Link href={repo.html_url} target="_blank">
          <span>{repo.name}</span>
        </Link>
      </p>
      <p className="text-sm dark:text-gray-300 text-gray-500">
        {repo?.description?.slice(0, 100) + "..."}
      </p>
    </div>
  );
};

export default Repo;
