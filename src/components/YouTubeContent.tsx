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
              className="w-96 h-36 flex flex-row py-3 flex-shrink-0 items-center border dark:border-zinc-800 border-zinc-100 px-3 rounded-lg"
            >
              <YouTubeImage url={snippet.thumbnails.medium.url} />
              <div className="pl-3">
                <Image
                  src="/youtube.svg"
                  width={30}
                  height={30}
                  alt="YouTube"
                  className="px-1 bg-zinc-700 rounded"
                />
                <p className=" text-zinc-700 dark:text-zinc-100 text-xs capitalize">
                  {snippet.title.slice(0, 100) + "..."}
                </p>
                <small className=" text-zinc-700 dark:text-zinc-300 text-xs flex items-center  "></small>
              </div>
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
