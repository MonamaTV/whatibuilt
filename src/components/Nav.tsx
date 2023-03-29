import { signOut } from "next-auth/react";
import Link from "next/link";
type NavTypes = {
  handleModal: () => void;
};
const Nav = ({ handleModal }: NavTypes) => {
  return (
    <nav className="flex flex-row justify-around py-6 dark:bg-background dark:text-gray-100">
      <p className="md:text-xl text-normal font-bold font-serif">WhatIBuilt</p>
      <br />
      <ul className="flex flex-row items-center gap-x-4 text-base dark:text-gray-100 text-gray-800">
        <li>
          <Link
            href={"/admin/links"}
            className="flex flex-row items-center gap-x-2  px-4 md:py-2 text-primary hover:bg-primary hover:text-gray-100 md:w-32 justify-center transition-colors duration-300 ease-in-out text-sm rounded-lg"
          >
            <span>Publish</span>
          </Link>
        </li>
        <li className="relative">
          <span className="peer flex flex-row items-center gap-x-2 text-sm">
            Profile
          </span>
          <div className="hover:flex peer-hover:flex hidden absolute w-32 px-1 bg-background dark:bg-zinc-50  flex-col justify-start py-4 gap-y-0 right-0 shadow ">
            <button
              onClick={handleModal}
              className="text-sm text-start px-2 py-1 w-full text-primary dark:text-zinc-900"
            >
              Change profile
            </button>
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/auth/login",
                })
              }
              className="text-sm text-start px-2 py-1 w-full text-primary dark:text-zinc-900"
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
