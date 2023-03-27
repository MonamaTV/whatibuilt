import axios, { AxiosInstance } from "axios";

export const axiosClient = (): AxiosInstance => {
  // const
  return axios.create({
    baseURL: "/api/",
    // timeout: 3000,
  });
};

export const youtubeClient = () => {
  return axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/channels",
    params: {
      part: "snippet,contentDetails,statistics",
      mine: true,
      key: process.env.GOOGLE_API_KEY,
    },
  });
};

export const youtubeAuthClient = () => {
  return axios.create({
    baseURL: process.env.GOOGLE_OAUTH,
    params: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: process.env.YOUTUBE_SCOPES,
    },
  });
};
export const youtubeTokenClient = () => {
  return axios.create({
    baseURL: process.env.GOOGLE_AUTH_TOKEN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
export const twitchAuthClient = () => {
  return axios.create({
    baseURL: process.env.TWITCH_OAUTH,
    params: {
      response_type: "code",
      redirect_uri: process.env.TWITCH_REDIRECT_URI,
      client_id: process.env.TWITCH_CLIENT_ID,
      scope: "user:edit",
    },
  });
};

export const twitchTokenClient = () => {
  return axios.create({
    baseURL: "https://id.twitch.tv/oauth2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
