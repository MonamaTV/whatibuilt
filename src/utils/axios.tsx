import axios, { AxiosInstance } from "axios";

export const axiosClient = (): AxiosInstance => {
  // const
  return axios.create({
    baseURL: "/api/",
    // timeout: 3000,
  });
};
