import Image from "next/image";
import { useState } from "react";

const ProfleImage = ({ source }: { source: string | null | undefined }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Image
      src={source || ""}
      width={"140"}
      height={"140"}
      className={`bg-zinc-800 w-[140px] h-[140px] shadow hidden md:block duration-700 ease-in-out ${
        loading ? "grayscale blur-2xl scale-110" : ""
      }`}
      alt="Profile picture"
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export default ProfleImage;
