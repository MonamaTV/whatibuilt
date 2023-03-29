import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import prisma from "@/utils/prisma";
import Link from "next/link";
import YouTubeContent from "@/components/YouTubeContent";
import GitHubContent from "@/components/GitHubContent";

const User = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="dark:bg-background min-h-screen min-w-screen flex flex-row md:justify-center md:items-center py-10">
      <div className="container mx-auto md:w-[1200px] flex flex-col md:flex-row md:justify-center md:bg-gray-50/10 px-4 md:p-10 md:border dark:border-none ">
        <div className="lg:w-[20%] md:w-[30%]  flex flex-row md:flex-col w-full mb-3 items-center md:items-start">
          {user.image && (
            <Image
              src={user.image}
              width={"140"}
              height={"140"}
              alt="Image"
              className="object-cover rounded-lg shadow"
            />
          )}
          <div className="px-3">
            <h3 className="font-bold text-xl font-serif md:hidden text-gray-900 dark:text-gray-100">
              {user.name}
            </h3>
            <p className="md:my-2 font-serif dark:text-gray-100 text-gray-700">
              {user.role}
            </p>
            <ul className="flex flex-row md:flex-col justify-around ">
              <li className="md:pl-0 md:px-4 px-2 py-1 text-sm bg-zinc-800 rounded-lg m-0.5 md:w-36 text-gray-200">
                <Link
                  href="/"
                  className="flex flex-row items-center text-xs text-gray-200 space-x-2"
                >
                  <Image
                    src={"/github1.svg"}
                    height={20}
                    width={20}
                    alt="GitHub"
                  />
                  <span className="hidden md:block">GitHub</span>
                </Link>
              </li>
              <li className="  md:pl-0 md:px-4 px-2 py-1 text-sm bg-zinc-800 rounded-lg m-0.5 md:w-36 text-gray-200">
                <Link
                  href="/"
                  className="flex flex-row items-center w-full text-xs text-gray-200 space-x-2"
                >
                  <Image
                    src={"/linkedin.svg"}
                    height={20}
                    width={20}
                    alt="LinkedIn"
                  />
                  <span className="hidden md:block">LinkedIn</span>
                </Link>
              </li>
              <li className="  md:pl-0 md:px-4 px-2 py-1 text-sm bg-zinc-800 rounded-lg m-0.5 md:w-36 text-gray-200">
                <Link
                  href="/"
                  className="flex flex-row items-center w-full text-xs text-gray-200 space-x-2"
                >
                  <Image
                    src={"/twitter.svg"}
                    height={20}
                    width={20}
                    alt="Twitter account"
                  />
                  <span className="hidden md:block">Twitter</span>
                </Link>
              </li>
              <li className="  md:pl-0 md:px-4 px-2 py-1 text-sm bg-zinc-800 rounded-lg m-0.5 md:w-36 text-gray-200">
                <Link
                  href="/"
                  className="flex flex-row items-center w-full text-xs text-gray-200 space-x-2"
                >
                  <Image
                    src={"/twitch.svg"}
                    height={20}
                    width={20}
                    alt="GitHub"
                  />
                  <span className="hidden md:block">Twitch</span>
                </Link>
              </li>
              <li className="  md:pl-0 md:px-4 px-2 py-1 text-sm bg-zinc-800 rounded-lg m-0.5 md:w-36 text-gray-200">
                <Link
                  href="/"
                  className="flex flex-row items-center w-full text-xs text-gray-200 space-x-2"
                >
                  <Image
                    src={"/youtube.svg"}
                    height={20}
                    width={20}
                    alt="Youtube channel"
                  />
                  <span className="hidden md:block">YouTube</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:w-[80%] flex flex-col">
          <div>
            <h1 className="relative text-3xl font-serif text-gray-900 dark:text-gray-100 mb-1 hidden md:block">
              {user.name}
            </h1>
            <p className="dark:text-gray-300 text-gray-500  text-sm">
              {user?.bio}
            </p>
          </div>
          {user.channels?.youtubeId && (
            <YouTubeContent channelId={user.channels?.youtubeId} />
          )}
          {user.channels?.githubId && (
            <GitHubContent githubId={user.channels?.githubId} />
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const username = context.query?.username as string;
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      channels: true,
      socials: true,
    },
  });
  return {
    props: { user: { ...user, publishedAt: null } },
  };
}

export default User;
