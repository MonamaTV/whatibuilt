import prisma from "@/utils/prisma";
import { Social, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface ApiRequest extends NextApiRequest {
  body: Omit<Social, "id">;
}

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  //Update user

  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      //Do I need to verify user?
      const user = await prisma.user.findUnique({
        where: {
          id: session?.user?.id,
        },
      });

      if (!user) {
        return res.status(400).send({
          message: "User doesn't exist",
          success: false,
          code: 400,
        });
      }

      const social = await prisma.social.create({
        data: {
          ...req.body,
          userID: user.id,
        },
      });

      res.status(201).json({
        message: "Social added",
        code: 201,
        data: social,
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        message: "Couldn't add your social",
        code: 400,
        success: false,
      });
    }
  }
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);

      const socials = await prisma.social.findMany({
        where: {
          userID: session?.user?.id,
        },
      });

      res.status(200).json({
        message: "Your socials",
        code: 200,
        data: socials,
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        message: "Couldn't get your socials",
        code: 400,
        success: false,
      });
    }
  }
  if (req.method === "DELETE") {
    try {
      const session = await getServerSession(req, res, authOptions);
      //Do I need to verify user?
      const socialID = Array.isArray(req.query.socialID)
        ? req.query.socialID.toString()
        : req.query.socialID;

      const user = await prisma.user.findUnique({
        where: {
          id: session?.user?.id,
        },
      });

      if (!user) {
        return res.status(400).send({
          message: "User doesn't exist",
          success: false,
          code: 400,
        });
      }

      const social = await prisma.social.deleteMany({
        where: {
          AND: [{ id: socialID }, { userID: user.id }],
        },
      });

      res.status(200).json({
        message: "Social deleted",
        code: 200,
        data: social,
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        message: "Couldn't add your social",
        code: 400,
        success: false,
      });
    }
  }
}
