import { Repos } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Repo = ({ repo, color }: { repo: Repos; color: string }) => {
  return (
    <div
      key={repo.id}
      className="w-72 p-3 h-36 flex-shrink-0 border dark:border-zinc-800 border-zinc-300 "
    >
      <h3 className="text-blue-500 font-semibold flex flex-row items-center gap-x-2">
        <Image src="/repo.png" width={"20"} height={"20"} alt="Github repo" />
        <Link href={repo.html_url} target="_blank">
          <span>{repo.name}</span>
        </Link>
      </h3>
      <small className="text-sm dark:text-zinc-300">
        {repo?.description?.slice(0, 100) + "..."}
      </small>
      {repo.language && (
        <small className="text-xs text-zinc-400  flex flex-row items-center my-1 gap-x-2">
          <div className={color}></div> Written in {repo.language}
        </small>
      )}
    </div>
  );
};

export default Repo;
