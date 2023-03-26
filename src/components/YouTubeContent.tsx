import { useScroll } from "@/hooks/useScroll";
import Image from "next/image";

const YouTubeContent = () => {
  const scroll = useScroll();
  return (
    <div className="w-full">
      <h3 className="text-xl text-zinc-800 dark:text-zinc-100 font-serif my-2">
        YouTube
      </h3>
      <div
        ref={scroll}
        className="flex flex-row overflow-x-hidden gap-x-2 w-full"
      >
        <div className="w-48  flex-shrink-0 border border-zinc-200 bg-zinc-50/10">
          <Image src={"/youtube.png"} width={"220"} height={"50"} alt="Tag" />
          <p className="px-2 text-zinc-700 dark:text-zinc-100 text-sm capitalize my-1 font-semibold ">
            How to delete FNB
          </p>
          <small className="px-2 text-zinc-700 dark:text-zinc-100 text-xs flex items-center my-1 mb-2">
            332 views
          </small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
        <div className="w-48  flex-shrink-0 border border-zinc-800 ">
          <Image src={"/youtube.png"} width={"220"} height={50} alt="Tag" />
          <p className="px-2 text-white text-sm">How to delete FNB</p>
          <small className="px-2 text-white text-xs">30,000 views</small>
        </div>
      </div>
    </div>
  );
};

export default YouTubeContent;
