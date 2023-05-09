import { axiosClient } from "@/utils/axios";
export type Channel = {
  githubId?: string | null;
  twitchId?: string | null;
  youtubeId?: string | null;
  hashnodeId?: string | null;
  devtoId?: string | null;
};
export const updateChannels = async (channels: Channel) => {
  const { data } = await axiosClient().put("/channels", channels);

  return data;
};
