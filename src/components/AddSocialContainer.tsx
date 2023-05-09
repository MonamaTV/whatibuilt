import React, { useState } from "react";
import AddSocial from "./AddSocial";
import { addSocial, removeSocial } from "@/services/socials";
import { useMutation } from "@tanstack/react-query";
import { Social } from "@prisma/client";
import { validateUrl } from "@/utils/types";

export type AddSocialContainerTypes = {
  socials: Social[] | null | undefined;
  handleToggle: () => void;
  handleAddSocialAccount: (data: Social) => void;
};

const AddSocialContainer = ({
  socials,
  handleToggle,
  handleAddSocialAccount,
}: AddSocialContainerTypes) => {
  const [addedSocials, setAddedSocials] = useState<Partial<Social>[]>(
    socials ?? []
  );

  const [url, setUrl] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const AddMutation = useMutation({
    mutationFn: (social: { url: string; name: string }) => {
      return addSocial(social);
    },
    onSuccess: ({ data }, { url, name }) => {
      // setAddedSocials((prev) => [...prev, data]);
      handleAddSocialAccount(data);
      handleToggle();
    },
    onError: (error: any) => {
      setError(error.data.message);
    },
    onSettled: () => {
      setLoadingButton(false);
    },
  });

  const handleSelectInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setValue(val);
  };

  const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrl(val);
  };

  const handleAddSocial = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const alreadyAdded = addedSocials.findIndex((soc) => soc.name === value);

    if (alreadyAdded !== -1) {
      setError("Platform already added");
      return;
    }
    if (value === "-1" || !value) {
      setError("Select platform");
      return;
    }
    const state = await validateUrl.isValid({ url });
    if (!state) {
      setError("Invalid URL");
      return;
    }
    setError("");
    setLoadingButton(true);
    const social = { name: value, url };
    AddMutation.mutate(social);
    setUrl("");
  };

  return (
    <div className="fixed top-0 left-0 w-screen min-h-screen bg-zinc-500/75 z-10 flex flex-col items-center justify-center transition-all px-3.5 shadow-lg shadow-white ">
      <button
        onClick={handleToggle}
        className="border border-red-500 px-3 py-1 relative text-red-500 top-10 md:left-[408px] left-[138px] hover:bg-red-500 hover:text-white transition-colors ease-in-out duration-200 rounded-md text-sm"
      >
        Close
      </button>
      <AddSocial
        error={error}
        handleAddSocial={handleAddSocial}
        handleSelectInput={handleSelectInput}
        handleUrlInput={handleUrlInput}
        loadingButton={loadingButton}
        url={url}
      />
    </div>
  );
};

export default AddSocialContainer;
