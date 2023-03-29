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
              className="w-56 md:w-96 md:h-36  flex flex-col md:flex-row py-3 flex-shrink-0 md:items-center justify-center border dark:border-zinc-800 border-zinc-100 px-3 rounded-lg gap-y-2"
            >
              <YouTubeImage url={snippet.thumbnails.medium.url} />
              <div className="md:pl-3">
                <Image
                  src="/youtube.svg"
                  width={"30"}
                  height={"30"}
                  className="block p-1 dark:bg-zinc-700 bg-red-100 rounded-md"
                  alt="YouTube"
                />
                <p className=" text-zinc-700 dark:text-zinc-100 text-sm capitalize">
                  {snippet.title.slice(0, 65) + "..."}
                </p>
                <small className=" text-zinc-700 dark:text-zinc-300 text-sm flex items-center  "></small>
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
