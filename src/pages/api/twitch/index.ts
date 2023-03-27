import { twitchAuthClient } from "@/utils/axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const url = twitchAuthClient().getUri();
    res.redirect(url);
  }
}
