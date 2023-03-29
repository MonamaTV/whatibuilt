import Image from "next/image";
import React, { useState } from "react";

const YouTubeImage = ({ url }: { url: string }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Image
      src={url}
      width={"200"}
      height={"50"}
      className={`object-cover rounded-lg duration-700 ease-in-out w-24 md:w-[200px] ${
        loading ? "grayscale blur-2xl scale-110" : ""
      }`}
      alt="Youtube thumbnalil"
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export default YouTubeImage;
