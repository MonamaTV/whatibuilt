import { updateChannels } from "@/services/channels";
import { Channels } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ToastError, ToastSuccess } from "./Toasts/Toasts";

const Platforms = ({
  channels,
  closeModal,
}: {
  channels: Channels;
  closeModal: () => void;
}) => {
  const [platforms, setPlatforms] = useState<Partial<Channels>>({
    hashnodeId: channels?.hashnodeId ?? "",
    devtoId: channels?.devtoId ?? "",
  });

  const handleChannelUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setPlatforms({
      ...platforms,
      [name]: value,
    });
  };

  const mutation = useMutation({
    mutationFn: (channels: Partial<Channels>) => {
      return updateChannels(channels);
    },
    onError: () => {
      ToastError("Failed to add your blogs. Try again");
    },
    onSuccess: () => {
      ToastSuccess("Added your blogs");
      closeModal();
    },
  });

  const handleSubmitUpdates = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.disabled = true;
    mutation.mutate(platforms);
  };

  return (
    <div className="border-dashed w-full md:w-[900px] h-[600px] flex flex-col  space-y-3  justify-center items-center border-primary rounded-lg dark:bg-background bg-zinc-200 px-3">
      <h2 className="text-2xl text-zinc-800 dark:text-zinc-100 font-serif px-4 py-3">
        Add more platforms
      </h2>

      <div className="flex flex-row justify-center md:w-2/5 md:mx-10 w-full mx-4">
        <input
          type="text"
          name="hashnodeId"
          value={platforms?.hashnodeId!}
          onChange={handleChannelUpdate}
          className="border w-2/3 outline-none dark:border-none border-zinc-100 text-sm rounded-lg px-4 py-2 rounded-r-none dark:bg-zinc-600 dark:text-zinc-100"
          placeholder="Hashnode username"
        />
        <span className="px-4 py-2 border text-sm rounded-l-none dark:border-zinc-700 rounded-lg dark:bg-inherit bg-zinc-200 text-zinc-500 dark:text-zinc-200 border-zinc-100">
          .hashnode.dev
        </span>
      </div>
      <div className="flex flex-row justify-center md:w-2/5 md:mx-10 w-full mx-4">
        <span className="px-4 py-2 border text-sm rounded-r-none dark:border-zinc-700 rounded-lg dark:bg-inherit bg-zinc-200 text-zinc-500 dark:text-zinc-200 border-zinc-100">
          https://dev.to/
        </span>
        <input
          value={platforms.devtoId!}
          name="devtoId"
          onChange={handleChannelUpdate}
          type="text"
          className="border w-2/3 outline-none dark:border-none border-zinc-100 text-sm rounded-lg px-4 py-2 rounded-l-none dark:bg-zinc-600 dark:text-zinc-100"
          placeholder="Dev username"
        />
      </div>
      <button
        onClick={handleSubmitUpdates}
        className="border disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed outline-none dark:border-none border-zinc-100 text-sm rounded-lg px-4 py-2 md:mx-10 w-full mx-4 md:w-2/5 bg-primary text-zinc-200"
      >
        Add
      </button>
    </div>
  );
};

export default Platforms;
