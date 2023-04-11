import React, { useEffect, useState } from "react";
import { githubClient } from "@/utils/axios";
import { Repos } from "@/utils/types";
import YouTubeLoader from "./Loaders/YouTubeLoader";
import Repo from "./Repo";
import { useQuery } from "@tanstack/react-query";
const GitHubContent = ({
  githubId,
  isAdmin,
  handleDisconnectChannel,
}: {
  githubId: string;
  isAdmin: boolean;
  handleDisconnectChannel?: () => void;
}) => {
  const fetchRepos = async (): Promise<Repos[]> => {
    try {
      const { data } = await githubClient().get(`/users/${githubId}/repos`, {
        params: {
          per_page: 10,
          sort: "created",
          direction: "desc",
        },
      });
      return data;
    } catch (error) {
      return [];
    }
  };

  const { data: repos } = useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
  });

  return repos && repos.length > 0 ? (
    <div className="w-full">
      <div className="flex flex-row items-center gap-x-2">
        <h3 className="text-xl text-zinc-700 dark:text-zinc-100 font-serif my-2">
          GitHub
        </h3>
        {isAdmin && (
          <button
            onClick={handleDisconnectChannel}
            className="text-xs text-red-600 border border-red-500 h-5 px-3 rounded-lg hover:bg-red-600 hover:text-zinc-200"
          >
            Disconnect
          </button>
        )}
      </div>
      <div className="flex flex-row overflow-x-auto gap-x-3 w-full">
        {repos.map((repo) => {
          return <Repo key={repo.id} repo={repo} />;
        })}
      </div>
    </div>
  ) : (
    <YouTubeLoader />
  );
};

export default GitHubContent;
