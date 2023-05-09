import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/utils/prisma";

interface ApiRequest extends NextApiRequest {
  body: {
    githubId?: string;
    youtubeId?: string;
    twitchId?: string;
  };
}

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const body = req.body;

      const update = await prisma.channels.update({
        where: {
          userID: session?.user?.id,
        },
        data: {
          ...body,
        },
      });

      if (!update)
        return res.status(400).json({
          message: "Failed to update channel",
          code: 400,
          success: false,
        });

      res.status(200).json({
        data: update,
        success: true,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating channel",
        code: 500,
        success: false,
      });
    }
  }
}
