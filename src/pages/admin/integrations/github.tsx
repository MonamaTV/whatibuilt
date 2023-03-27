import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import React from "react";

const GitHub = () => {
  return (
    <div className="dark:bg-background mx-auto min-h-screen w-full flex flex-col justify-center items-center gap-2">
      <h3 className="text-3xl text-zinc-800 dark:text-zinc-100 font-serif">
        Unsuccessful
      </h3>
      <p className="text-zinc-100 text-sm">
        Failed to integrate with GitHub. Please try again...
      </p>
      <div className="flex  flex-row w-42 gap-x-2">
        <button className="px-3 py-2 capitalize text-sm  text-zinc-300  w-full ">
          Go back home
        </button>
        <button className="w-32 px-2 py-2 capitalize text-sm  bg-zinc-800 text-gray-100  ">
          Try again
        </button>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   try {
//     const code = context.query.code;

//     const session = await getServerSession(
//       context.req,
//       context.res,
//       authOptions
//     );

//     if (!session) {
//       return { redirect: { destination: "/auth/login", permanent: false } };
//     }

//     if (!code) {
//       return {
//         redirect: { destination: "/admin/integrations", permanent: false },
//       };
//     }

//     if (code) {
//       console.log({
//         code: code,
//         grant_type: "authorization_code",
//         redirect_uri: process.env.TWITCH_REDIRECT_URI,
//         client_id: process.env.TWITCH_CLIENT_ID,
//         client_secret: process.env.TWITCH_CLIENT_SECRET,
//       });
//       const { data } = await twitchTokenClient().post("", {
//         code: code,
//         grant_type: "authorization_code",
//         redirect_uri: process.env.TWITCH_REDIRECT_URI,
//         client_id: process.env.TWITCH_CLIENT_ID,
//         client_secret: process.env.TWITCH_CLIENT_SECRET,
//       });

//       console.log(data);
//     }

//     return {
//       props: { data: [] },
//     };
//   } catch (error: any) {
//     console.log(error);
//     return {
//       props: { data: [] },
//     };
//     // return { redirect: { destination: "/auth/login", permanent: false } };
//   }
// }

export default GitHub;
