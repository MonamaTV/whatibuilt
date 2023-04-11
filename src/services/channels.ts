import { axiosClient } from "@/utils/axios";

export const updateChannels = async (channels: {
  gitHubId?: string;
  twitchId?: string;
  youtubeId?: string;
}) => {
  const { data } = await axiosClient().put("/channels", channels);

  return data;
};
