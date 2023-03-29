import React, { useEffect, useState } from "react";
import { githubClient } from "@/utils/axios";
import { Repos } from "@/utils/types";
import YouTubeLoader from "./Loaders/YouTubeLoader";
import Repo from "./Repo";
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
      <h3 className="text-xl text-zinc-900 dark:text-zinc-100 font-serif my-2">
        GitHub
      </h3>
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
