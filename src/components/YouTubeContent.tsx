import Image from "next/image";
import axios from "axios";
import { Root } from "@/utils/types";
import YouTubeLoader from "./Loaders/YouTubeLoader";
import YouTubeImage from "./Image/Image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
const YouTubeContent = ({
  channelId,
  isAdmin,
  handleDisconnectChannel,
}: {
  handleDisconnectChannel?: () => void;
  channelId: string;
  isAdmin: boolean;
}) => {
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

  const fetchChannelContent = async (): Promise<Root[]> => {
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
      return items;
    } catch (error) {
      return [];
    }
  };

  const { data: content } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchChannelContent,
  });

  return content && content.length > 0 ? (
    <div className="w-full">
      <div className="flex flex-row items-center gap-x-2">
        <h3 className="text-xl text-zinc-700 dark:text-zinc-100 font-serif my-2">
          YouTube
        </h3>
        {isAdmin && (
          <button
            onClick={handleDisconnectChannel}
            className="hover:bg-red-600 hover:text-zinc-200 text-xs text-red-600 border border-red-500 h-5 px-3 rounded-lg"
          >
            Disconnect
          </button>
        )}
      </div>
      <div
        // ref={scroll}
        className="flex flex-row overflow-x-auto  gap-x-3 w-full"
      >
        {content.map((video) => {
          const { snippet } = video;

          return (
            <div
              key={video.id}
              className="w-56 md:w-96 md:h-36 shadow-md flex flex-col md:flex-row py-3 flex-shrink-0 md:items-center justify-center border dark:border-zinc-700 border-zinc-200 px-3 rounded-lg gap-y-2"
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
                <Link
                  target={"_blank"}
                  href={
                    "https://www.youtube.com/watch?v=" +
                    video.snippet.resourceId.videoId
                  }
                  className="dark:text-gray-300 text-gray-500  text-sm  capitalize"
                >
                  {snippet.title.slice(0, 65) + "..."}
                </Link>
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
