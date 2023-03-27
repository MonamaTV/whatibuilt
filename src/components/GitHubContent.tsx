import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { githubClient } from "@/utils/axios";
import { Repos } from "@/utils/types";
import Link from "next/link";
import YouTubeLoader from "./Loaders/YouTubeLoader";
const GitHubContent = ({ githubId }: { githubId: string | null }) => {
  const [repos, setRepos] = useState<Repos[]>([]);
  const fetchRepos = async () => {
    try {
      const { data } = await githubClient().get(`/users/${githubId}/repos`, {
        params: {
          per_page: 10,
          sort: "created",
          direction: "desc",
        },
      });
      setRepos(data);
    } catch (error) {
      setRepos([]);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return repos.length > 0 ? (
    <div className="w-full">
      <h3 className="text-xl text-gray-500 dark:text-zinc-100 font-serif my-2">
        GitHub
      </h3>
      <div className="flex flex-row overflow-x-auto gap-x-3 w-full">
        {repos.map((repo) => {
          return (
            <div className="w-72 p-3 h-36 flex-shrink-0 border border-zinc-300 ">
              <h3 className="text-blue-500 font-semibold flex flex-row items-center gap-x-2">
                <Image
                  src="/repo.png"
                  width={"20"}
                  height={"20"}
                  alt="Github repo"
                />
                <Link href={repo.html_url} target="_blank">
                  <span>{repo.name}</span>
                </Link>
              </h3>
              <small className="text-sm dark:text-zinc-300">
                {repo.description?.slice(0, 100) + "..."}
              </small>
              {repo.language && (
                <small className="text-xs text-zinc-400 block">
                  Written in {repo.language}
                </small>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <YouTubeLoader />
  );
};

export default GitHubContent;
