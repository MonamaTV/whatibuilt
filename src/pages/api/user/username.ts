import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const username: string = req.query?.username
      ? req.query?.username.toString()
      : "";
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username.toString(),
        },
      });

      if (user) {
        return res.status(200).send({
          message: "username already exists",
          success: false,
          code: 200,
          exists: true,
        });
      }

      res.status(200).send({
        message: "username does not exist",
        success: true,
        code: 200,
        exists: false,
      });
    } catch (error) {
      return res.status(400).send({
        message: "Couldn't process your request",
        success: false,
        code: 400,
      });
    }
  }
  if (req.method === "POST") {
    const username: string = req.body?.username;
    if (username.length < 3) {
      return res.status(400).json({
        message: "Username cannot be less than 3 characters",
        success: false,
        code: 400,
      });
    }

    try {
      const session = await getServerSession(req, res, authOptions);
      //Using Ids to identify users since emails sometimes are null if the providers do not provide them
      const user = await prisma.user.update({
        where: {
          id: session?.user?.id,
        },
        data: {
          username: username.toLowerCase(),
        },
      });
      //If there is a user with your username already
      if (!user) {
        return res.status(400).send({
          message: "Failed to update your username",
          success: false,
          code: 400,
        });
      }

      res.status(200).send({
        message: "Username does not exist",
        success: true,
        code: 200,
      });
    } catch (error) {
      res.status(400).send({
        message: "Couldn't process your request",
        success: false,
        code: 400,
      });
    }
  }
}
