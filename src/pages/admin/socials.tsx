import { addSocial, removeSocial } from "@/services/socials";
import prisma from "@/utils/prisma";
import { socials, validateUrl } from "@/utils/types";
import { Social } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Socials = ({ socialAccounts }: { socialAccounts: Social[] }) => {
  const [addedSocials, setAddedSocials] =
    useState<Partial<Social>[]>(socialAccounts);
  const [data, setData] = useState(socials);

  const [url, setUrl] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const removeMutation = useMutation({
    mutationFn: (id: string) => {
      return removeSocial(id);
    },
    onSuccess: ({ data }, id) => {
      setAddedSocials((prev) => prev.filter((pr) => pr.id !== id));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const AddMutation = useMutation({
    mutationFn: (social: { url: string; name: string }) => {
      return addSocial(social);
    },
    onSuccess: ({ data }, { url, name }) => {
      setAddedSocials((prev) => [...prev, data]);
    },
    onError: (error) => {
      console.log(error);
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
    // setData(data.filter((social) => social.value !== value));
  };
  const handleRemoveSocial = (
    e: React.MouseEvent<HTMLButtonElement>,
    socialID: string
  ) => {
    e.currentTarget.disabled = true;
    removeMutation.mutate(socialID);
  };

  return (
    <div className="relative md:w-[60%] w-full space-y-1">
      <h3 className="text-2xl text-zinc-800 dark:text-zinc-100 font-serif my-2">
        Socials
      </h3>
      <p className="dark:text-zinc-100 text-zinc-700 text-sm">
        Share your social accounts for folks to connect with you
      </p>
      <select
        onChange={handleSelectInput}
        className=" dark:bg-zinc-600 text-zinc-900  focus:ring-rose-50/10 focus:dark:bg-zinc-600 block w-full dark:dark:bg-zinc-600  dark:placeholder-zinc-400 dark:text-white dark:focus:ring-rose-50/10 dark:focus:dark:bg-zinc-600 py-2 px-3 outline-none border border-zinc-300 dark:border-none text-sm"
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
        className="w-full mb-2 px-4 py-2 text-sm dark:bg-zinc-600 outline-none dark:border-none border border-zinc-300 dark:text-zinc-100"
        placeholder="Paste here..."
      />
      {error ? <p className="text-red-600 text-xs my-1">{error}</p> : null}

      <button
        onClick={handleAddSocial}
        disabled={loadingButton}
        className="disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed px-3 py-2 capitalize text-sm  bg-primary  md:w-44 w-full text-zinc-900 absolute right-0 block"
      >
        Add link
      </button>
      <br />
      <br />

      {addedSocials.length > 0 && (
        <>
          <h4 className="text-xl text-zinc-800 dark:text-rose-100 font-serif my-2">
            Added
          </h4>
          <p className="text-sm dark:text-zinc-100 text-zinc-700">
            Click if you want to remove
          </p>
          {addedSocials.map((social) => (
            <button
              key={social.id}
              onClick={(e) => handleRemoveSocial(e, social.id!)}
              className="border disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed dark:border-zinc-50 text-zinc-100 w-44 px-3 py-2 bg-background"
            >
              {socials.find((soc) => soc.value === social.name)?.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!session) {
      return { redirect: { destination: "/auth/login", permanent: false } };
    }

    const socialAccounts = await prisma.social.findMany({
      where: {
        userID: session.user?.id,
      },
    });

    return {
      props: { socialAccounts },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

export default Socials;
