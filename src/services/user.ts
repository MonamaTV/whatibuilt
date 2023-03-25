import { axiosClient } from "@/utils/axios";
import { User } from "@prisma/client";

export const updateUser = async (user: Partial<User>) => {
  const { data } = await axiosClient().put("/user", user);

  return data;
};
