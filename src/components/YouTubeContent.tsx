import { useScroll } from "@/hooks/useScroll";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Root } from "@/utils/types";
import YouTubeLoader from "./Loaders/YouTubeLoader";
import YouTubeImage from "./Image/Image";
const YouTubeContent = ({ channelId }: { channelId: string | null }) => {
  const [content, setContent] = useState<Root[]>([]);

  const fetchChannelUploadId = async () => {
    const { data } = await axios.get(
      "https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails",
      {
        params: {
          key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
          id: channelId,
        },
      }
    );
    console.log(data);
    if (!data.items[0].contentDetails.relatedPlaylists.uploads)
      throw new Error("No uploads");
    return data.items[0].contentDetails.relatedPlaylists.uploads;
  };

  const fetchChannelContent = async () => {
    try {
      const uploadID = await fetchChannelUploadId();
      const { data } = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet",
        {
          params: {
            key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            playlistId: uploadID,
            maxResults: 10,
          },
        }
      );

      const items: Root[] = data.items;
      setContent(items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChannelContent();
  }, []);

  //   const scroll = useScroll();
  return content.length > 0 ? (
    <div className="w-full">
      <h3 className="text-xl text-zinc-800 dark:text-zinc-100 font-serif my-2">
        YouTube
      </h3>
      <div
        // ref={scroll}
        className="flex flex-row overflow-x-auto  gap-x-3 w-full"
      >
        {content.map((video) => {
          const { snippet } = video;

          return (
            <div
              key={video.id}
              className="w-56 pb-2  flex-shrink-0 border dark:border-zinc-800 border-zinc-100"
            >
              <YouTubeImage url={snippet.thumbnails.medium.url} />
              <p className="px-2 pt-3 text-zinc-700 dark:text-zinc-100 text-sm capitalize my-1">
                {snippet.title.slice(0, 50) + "..."}
              </p>
              <small className="px-2 text-zinc-700 dark:text-zinc-300 text-xs flex items-center  ">
                {/* {snippet.publishedAt.split("T")[0]} */}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <YouTubeLoader />
  );
};

export default YouTubeContent;
