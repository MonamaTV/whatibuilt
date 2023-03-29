import React, { useEffect, useState } from "react";
import { githubClient } from "@/utils/axios";
import { Repos } from "@/utils/types";
import YouTubeLoader from "./Loaders/YouTubeLoader";
import { getColor } from "@/utils/colors";
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
      <h3 className="text-xl text-gray-500 dark:text-zinc-100 font-serif my-2">
        GitHub
      </h3>
      <div className="flex flex-row overflow-x-auto gap-x-3 w-full">
        {repos.map((repo) => {
          const color: string =
            `bg-[${getColor(repo.language) ?? "#f4f4f4"}]` +
            " w-3 h-3 rounded-full";
          console.log(repo.language, color);
          return <Repo key={repo.id} repo={repo} color={color} />;
        })}
      </div>
    </div>
  ) : (
    <YouTubeLoader />
  );
};

export default GitHubContent;
