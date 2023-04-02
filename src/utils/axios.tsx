import axios, { AxiosInstance } from "axios";

export const axiosClient = (): AxiosInstance => {
  // const
  return axios.create({
    baseURL: "/api/",
    // timeout: 3000,
  });
};

//YouTube clients
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
  const uri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/admin/integrations/youtube"
      : process.env.GOOGLE_REDIRECT_URI;
  return axios.create({
    baseURL: process.env.GOOGLE_OAUTH,
    params: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: uri,
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

//Twitch clients
export const twitchClient = () => {
  return axios.create({
    baseURL: "https://api.twitch.tv/helix",
  });
};
export const twitchAuthClient = () => {
  const uri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/admin/integrations/twitch"
      : process.env.TWITCH_REDIRECT_URI;
  return axios.create({
    baseURL: process.env.TWITCH_OAUTH,
    params: {
      response_type: "code",
      redirect_uri: uri,
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

// GitHub axio clients
export const githubAuthClient = () => {
  return axios.create({
    baseURL: process.env.GITHUB_OAUTH + "/authorize",
    params: {
      redirect_uri: process.env.GITHUB_REDIRECTURI,
      client_id: process.env.GITHUB_CLIENT_ID,
    },
  });
};
export const githubTokenClient = () => {
  return axios.create({
    baseURL: process.env.GITHUB_OAUTH + "/access_token",
  });
};
export const githubClient = () => {
  return axios.create({
    baseURL: "https://api.github.com",
  });
};

export const githubUri = githubAuthClient().getUri();
