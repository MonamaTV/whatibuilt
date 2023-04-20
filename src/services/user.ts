import { axiosClient } from "@/utils/axios";
import { Channels, Social, User } from "@prisma/client";

export const updateUser = async (user: Partial<User>) => {
  const { data } = await axiosClient().put("/user", user);

  return data;
};

export const getUser = async () => {
  const { data } = await axiosClient().get("/user");

  return data;
};
