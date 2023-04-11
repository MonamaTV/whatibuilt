import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
type NavTypes = {
  handleModal: () => void;
  state: boolean;
  handlePublish: () => void;
};
const Nav = ({ handleModal, state, handlePublish }: NavTypes) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex flex-row justify-around py-6 dark:bg-background dark:text-gray-100">
      <Link href="/" className="md:text-xl text-normal font-bold font-serif">
        WhatIBuilt
      </Link>
      <br />
      <ul className="flex flex-row items-center gap-x-4 text-base dark:text-gray-100 text-gray-800">
        <li>
          <button
            onClick={handlePublish}
            className="flex flex-row items-center gap-x-2  px-1 md:py-1 dark:text-white text-zinc-800 hover:bg-primary hover:text-gray-100 md:w-24 justify-center transition-colors duration-300 ease-in-out text-xs rounded-lg"
          >
            {state ? <span>Unpublish</span> : <span>Publish</span>}
          </button>
        </li>
        <li className="relative">
          <span className="peer flex flex-row items-center gap-x-2 text-xs">
            Settings
          </span>
          <div className="hover:flex peer-hover:flex hidden absolute w-36 px-1 bg-zinc-900 dark:bg-zinc-500  flex-col justify-start py-4 gap-y-1 right-0 shadow rounded-lg z-20">
            <button
              onClick={handleModal}
              className="text-xs text-start px-2 py-1 w-full text-white dark:text-zinc-200 rounded-md hover:bg-primary "
            >
              Change profile
            </button>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-xs text-start px-2 py-1 w-full text-white dark:text-zinc-200 rounded-md hover:bg-primary "
            >
              Toggle mode
            </button>
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/auth/login",
                })
              }
              className="text-xs text-start px-2 py-1 w-full text-white dark:text-zinc-200 rounded-md hover:bg-primary "
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
