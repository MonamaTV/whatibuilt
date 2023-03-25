import prisma from "@/utils/prisma";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface ApiRequest extends NextApiRequest {
  body: Pick<User, "bio" | "image" | "name" | "role" | "emailVerified">;
}

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  //Update user

  if (req.method === "PUT") {
    try {
      const session = await getServerSession(req, res, authOptions);

      const user = await prisma.user.update({
        where: {
          id: session?.user?.id,
        },
        data: {
          ...req.body,
        },
      });

      if (!user) {
        return res.status(400).json({
          message: "Failed to update user",
          code: 400,
          success: false,
        });
      }

      res.status(201).json({
        message: "User updated",
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        message: "Couldn't process your request",
        code: 400,
        success: false,
      });
    }
  }
}
