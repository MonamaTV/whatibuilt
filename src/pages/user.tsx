import { useScroll } from "@/hooks/useScroll";
import Image from "next/image";
import Link from "next/link";

const User = () => {
  const scroll = useScroll();
  return (
    <div className="dark:bg-background min-h-screen min-w-screen flex flex-row md:justify-center md:items-center py-10">
      <div className="container mx-auto md:w-[1200px] flex flex-col md:flex-row md:justify-center md:bg-gray-50/10 px-4 md:p-10 md:border dark:border-none ">
        <div className="lg:w-[20%] md:w-[30%]  flex flex-row md:flex-col w-full mb-3 items-center md:items-start">
          <Image
            src={"/toucj.jpg"}
            width={"140"}
            height={"140"}
            alt="Image"
            className=" shadow"
          />
          <div className="px-3">
            <h3 className="font-bold text-xl font-serif md:hidden text-gray-900 dark:text-gray-100">
              Monama Vincent
            </h3>
            <p className="md:my-2 font-serif dark:text-gray-100 text-gray-700">
              Software Engineer
            </p>
            <ul className="flex flex-row md:flex-col justify-around ">
              <li className="  md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 text-gray-200">
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
              <li className="  md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 text-gray-200">
                <Link
                  href="/"
                  className="flex flex-row items-center w-full text-xs text-gray-200 space-x-2"
                >
                  <Image
                    src={"/linkedin.svg"}
                    height={20}
                    width={20}
                    alt="GitHub"
                  />
                  <span className="hidden md:block">LinkedIn</span>
                </Link>
              </li>
              <li className="  md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 text-gray-200">
                <Link
                  href="/"
                  className="flex flex-row items-center w-full text-xs text-gray-200 space-x-2"
                >
                  <Image
                    src={"/twitter.svg"}
                    height={20}
                    width={20}
                    alt="GitHub"
                  />
                  <span className="hidden md:block">Twitter</span>
                </Link>
              </li>
              <li className="  md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 text-gray-200">
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
              <li className="  md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 text-gray-200">
                <Link
                  href="/"
                  className="flex flex-row items-center w-full text-xs text-gray-200 space-x-2"
                >
                  <Image
                    src={"/youtube.svg"}
                    height={20}
                    width={20}
                    alt="GitHub"
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
              Monama Vincent
            </h1>
            <p className="dark:text-gray-300 text-gray-500  text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
              dolorem deserunt itaque, nemo exercitationem dolores in est,
              ratione minima, nulla provident? Sequi, illo neque iste quae
              ducimus eaque voluptates. Laborum veniam reiciendis nobis
              eligendi? Nemo deserunt accusantium incidunt veritatis, est
              asperiores. Quo amet tempore esse laudantium voluptas quaerat unde
              eius?
            </p>
          </div>
          <div className="w-full">
            <h2 className="text-2xl text-gray-500 dark:text-rose-100 font-serif my-2">
              YouTube
            </h2>
            <div
              ref={scroll}
              className="flex flex-row overflow-x-hidden gap-x-2 w-full"
            >
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>

              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-2xl text-gray-500 dark:text-rose-100 font-serif my-2">
              Twitch
            </h2>
            <div className="flex flex-row overflow-x-hidden gap-x-2 w-full">
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-2xl text-gray-500 dark:text-rose-100 font-serif my-2">
              GitHub
            </h2>
            <div
              ref={scroll}
              className="flex flex-row overflow-x-hidden gap-x-2 w-full"
            >
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>

              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
              <div className="w-48 h-32 flex-shrink-0 bg-primary "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
