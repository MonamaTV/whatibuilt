import { axiosClient } from "@/utils/axios";
import { Social } from "@prisma/client";

export const addSocial = async (social: Partial<Social>) => {
  const { data } = await axiosClient().post("/social", social);

  return data;
};

export const removeSocial = async (socialID: string) => {
  const { data } = await axiosClient().delete("/social", {
    params: {
      socialID,
    },
  });

  return data;
};

export const getSocials = async (): Promise<Social[] | []> => {
  const {
    data: { data },
  } = await axiosClient().get("/social");

  return data;
};
