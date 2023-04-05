import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import prisma from "@/utils/prisma";
import Link from "next/link";
import YouTubeContent from "@/components/YouTubeContent";
import GitHubContent from "@/components/GitHubContent";
import { socials } from "@/utils/types";
import { useRouter } from "next/router";

const User = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  if (user === null) {
    return (
      <div className="dark:bg-background min-h-screen min-w-screen flex flex-col justify-center items-center py-10 gap-y-2">
        <h1 className="text-5xl font-bold font-serif dark:text-zinc-100">
          WhatIBuilt
        </h1>
        <br />
        <p className="px-10 text-sm dark:text-zinc-100">
          Username does not exist... You can claim it.
        </p>
        <input
          type={"text"}
          value={router.query.username}
          className="px-3 py-2 rounded-lg border w-80 md:w-96 dark:bg-zinc-600 border-zinc-200 dark:border-zinc-800 text-zinc-800 outline-none"
        />
        <button className="bg-primary w-80 md:w-96 text-center px-3 py-2 rounded-lg text-white ">
          Claim it!
        </button>
      </div>
    );
  }

  return (
    <div className="dark:bg-background min-h-screen min-w-screen flex flex-col md:justify-center md:items-center py-10">
      <div className="container mx-auto md:w-[1200px] flex flex-col md:flex-row md:justify-center  px-4 md:p-10 md:border dark:border-none rounded-lg">
        <div className="lg:w-[20%] md:w-[30%]  flex flex-row md:flex-col w-full mb-3 items-center md:items-start ">
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
            <h3 className="font-bold text-xl font-serif md:hidden text-zinc-700 dark:text-zinc-100">
              {user.name}
            </h3>
            <p className="md:my-2 font-serif dark:text-zinc-100 text-zinc-700">
              {user.role}
            </p>
            <ul className="flex flex-row md:flex-col justify-start gap-x-1">
              {user.channels?.githubId && (
                <li className="hover:bg-zinc-100  md:pl-0 md:px-4 px-2 py-1 text-sm dark:bg-zinc-800 md:dark:bg-inherit rounded-lg bg-zinc-100  m-0.5 md:w-36 text-zinc-600 dark:text-zinc-200 md:bg-inherit">
                  <Link
                    href={"https://github.com/" + user.channels.githubId}
                    className="flex flex-row items-center text-xs  space-x-2"
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
              )}
              {user.socials &&
                user.socials.map((social) => {
                  const name = socials.find(
                    (soc) => soc.value === social.name
                  )?.name;
                  return (
                    <li
                      key={social.id}
                      className="hover:bg-zinc-100 md:pl-0 md:px-4 px-2 py-1 text-sm dark:bg-zinc-800 md:dark:bg-inherit rounded-lg bg-zinc-100 md:bg-inherit  m-0.5 md:w-36 text-zinc-600 dark:text-zinc-200"
                    >
                      <Link
                        href={social.url}
                        target="_blank"
                        className="flex flex-row items-center w-full text-xs  space-x-2"
                      >
                        <Image
                          src={`/${name?.toLowerCase()}.svg`}
                          height={20}
                          width={20}
                          alt="LinkedIn"
                        />
                        <span className="hidden md:block">{name}</span>
                      </Link>
                    </li>
                  );
                })}

              {user.channels?.twitchId && (
                <li className="hover:bg-zinc-100 md:pl-0 md:px-4 px-2 py-1 text-sm dark:bg-zinc-800 md:dark:bg-inherit rounded-lg bg-zinc-100 md:bg-inherit  m-0.5 md:w-36 text-zinc-600 dark:text-zinc-200">
                  <Link
                    href="/"
                    className="flex flex-row items-center w-full text-xs  space-x-2"
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
              )}
              {user.channels?.youtubeId && (
                <li className="md:pl-0 md:px-4 px-2 py-1 text-sm dark:bg-zinc-800 md:dark:bg-inherit rounded-lg bg-zinc-100  m-0.5 md:w-36 text-zinc-600 dark:text-zinc-200 md:bg-inherit">
                  <Link
                    href={
                      "https://www.youtube.com/watch?ab_channel=" +
                      user.channels.youtubeId
                    }
                    target="_blank"
                    className="flex flex-row items-center w-full text-xs space-x-2"
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
              )}
            </ul>
          </div>
        </div>
        <div className="md:w-[80%] flex flex-col">
          <div>
            <h1 className="relative text-3xl font-serif text-zinc-900 dark:text-zinc-100 mb-1 hidden md:block">
              {user.name}
            </h1>
            <p className="dark:text-zinc-300 text-zinc-500  text-sm">
              {user?.bio}
            </p>
          </div>

          {user.channels?.githubId && (
            <GitHubContent githubId={user.channels?.githubId} />
          )}
          {user.channels?.youtubeId && (
            <YouTubeContent channelId={user.channels?.youtubeId} />
          )}
        </div>
      </div>

      <div className="flex  justify-center text-center my-4 mt-24 flex-col">
        <p className="text-sm dark:text-zinc-300 text-zinc-800">
          Create your <span className="font-serif font-bold ">WhatIBuilt </span>
          profile
        </p>
        <div className="text-xs gap-x-3 flex justify-center">
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const username = context.query?.username as string;
    const user = await prisma.user.findMany({
      where: {
        AND: {
          username: username,
          published: false,
        },
      },
      include: {
        channels: true,
        socials: true,
      },
    });

    if (!user) return { props: { user: null } };
    const firstUser = user[0];

    return {
      props: { user: { ...firstUser, publishedAt: null } },
    };
  } catch (error) {
    return {
      props: { user: null },
    };
  }
}

export default User;
