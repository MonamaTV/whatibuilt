import { socials } from "@/utils/types";
import React, { useState } from "react";

type AddSocialTypes = {
  handleSelectInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleUrlInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddSocial: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loadingButton: boolean;
  error: string;
  url: string;
};

const AddSocial = ({
  handleSelectInput,
  handleUrlInput,
  handleAddSocial,
  error,
  loadingButton,
  url,
}: AddSocialTypes) => {
  const [data, _] = useState(socials);
  return (
    <div className="border-dashed w-full md:w-[900px] h-[600px] dark:bg-background bg-zinc-200 flex flex-col justify-center items-center space-y-3  border-primary rounded-lg">
      <p className="dark:text-zinc-100 text-zinc-700 text-sm md:w-96 w-72 text-center">
        Share your social accounts for folks to connect with you. Copy and paste
        the links below.
      </p>
      <select
        onChange={handleSelectInput}
        className=" dark:bg-zinc-600 text-zinc-900  focus:ring-rose-50/10 focus:dark:bg-zinc-600 block md:w-96 w-72 dark:dark:bg-zinc-600  dark:placeholder-zinc-400 dark:text-white dark:focus:ring-rose-50/10 dark:focus:dark:bg-zinc-600 py-2 px-3 outline-none border border-zinc-300 dark:border-none text-sm rounded-lg"
      >
        <option value={"-1"}>Select</option>
        {data.map(({ name, value, id }) => (
          <option key={id} value={value}>
            {name}
          </option>
        ))}
      </select>
      <input
        value={url}
        onChange={handleUrlInput}
        type={"url"}
        required
        className="md:w-96 w-72 mb-2 px-4 py-2 text-sm dark:bg-zinc-600 outline-none dark:border-none border border-zinc-300 dark:text-zinc-100 rounded-lg"
        placeholder={`Paste link here...`}
      />
      {error ? (
        <p className="md:w-96 w-72 text-red-600 text-xs ">{error}</p>
      ) : null}
      <button
        onClick={handleAddSocial}
        disabled={loadingButton}
        className="disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed px-3 py-2 capitalize text-sm  bg-primary  md:w-96 w-72 text-zinc-100  block rounded-lg"
      >
        Add link
      </button>
    </div>
  );
};

export default AddSocial;
