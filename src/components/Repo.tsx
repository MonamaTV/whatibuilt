import { Repos } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Repo = ({ repo, color }: { repo: Repos; color: string }) => {
  return (
    <div
      key={repo.id}
      className="w-72 p-3 px-4 h-40 flex flex-shrink-0 flex-col border dark:border-zinc-800 border-zinc-100 rounded-lg gap-y-1"
    >
      <Image
        src="/Github.svg"
        width={"30"}
        height={"30"}
        className="block p-1 dark:bg-zinc-700 bg-zinc-100 rounded-md"
        alt="Github repo"
      />
      <p className="dark:text-zinc-200 text-zinc-900 text-lg flex flex-row items-center gap-x-2">
        <Link href={repo.html_url} target="_blank">
          <span>{repo.name}</span>
        </Link>
      </p>
      <small className="text-sm text-zinc-700 dark:text-zinc-300">
        {repo?.description?.slice(0, 100) + "..."}
      </small>
      {/* {repo.language && (
        <small className="text-xs text-zinc-400  flex flex-row items-center my-1 gap-x-2">
          <div className={color.toString()}></div> Written in {repo.language}
        </small>
      )} */}
    </div>
  );
};

export default Repo;
