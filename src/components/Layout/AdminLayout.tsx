import { updateUser } from "@/services/user";
import { supabase } from "@/utils/supabase";
import { Social, User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import path from "path";
import { PropsWithChildren, useState } from "react";
import Nav from "../Nav";
import ProfleImage from "../ProfilePicture";
import { ToastError, ToastSuccess } from "../Toasts/Toasts";
import Uploader from "../Uploader";
import Modal from "../Modal";
import AddSocialContainer from "../AddSocialContainer";
import { getSocials, removeSocial } from "@/services/socials";
import { socials as socialsTypes } from "@/utils/types";
import Meta from "../Meta";

const AdminLayout = ({ children }: PropsWithChildren) => {
  const [file, setFile] = useState<File | undefined>();
  const router = useRouter();
  const session = useSession({ required: true });
  const [modal, setModal] = useState<boolean>(false);
  const [socialModal, setSocialModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleSocialModal = () => {
    setSocialModal(!socialModal);
  };
  const [socials, setSocials] = useState<Social[]>([]);

  useQuery({
    queryFn: getSocials,
    queryKey: ["socials"],
    onSuccess: (data) => {
      setSocials(data);
    },
  });

  const mutation = useMutation({
    mutationFn: (user: Partial<User>) => {
      return updateUser(user);
    },
    onError: () => {
      ToastError("Failed to change your profile");
    },
    onSuccess: () => {
      toggleModal(); //Close modal after success
      ToastSuccess("Profile updated");
    },
  });

  const [publishState, setPublishLoading] = useState(false);

  //Upload profile picture
  const handleFileUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.disabled = true;
    e.currentTarget.textContent = "Uploading...";

    try {
      if (!file) return;
      const fileExt = path.extname(file.name);
      const newFilename = "avatar" + Date.now().toString() + fileExt;
      const { error } = await supabase.storage
        .from("avatars")
        .upload(`profiles/${newFilename}`, file);

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(`profiles/${newFilename}`);

      if (error) {
        ToastError("Failed to upload your picture");
      }

      mutation.mutate({ image: data.publicUrl });
    } catch (error) {
      e.currentTarget.disabled = false;
      e.currentTarget.textContent = "Upload";
    }
  };

  //Publish or unpublish user
  const updateMutation = useMutation({
    mutationFn: (state: boolean) => {
      return updateUser({ published: state });
    },
    onSuccess: (data) => {
      ToastSuccess(data.message);
    },
    onError: () => {
      ToastError("Failed to publish your profile");
    },
    onSettled: () => {
      setPublishLoading(false);
    },
  });

  const handlePublishUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (session?.data === null) return;
    setPublishLoading(true);
    updateMutation.mutate(!session?.data.user?.published);
  };

  const removeMutation = useMutation({
    mutationFn: (id: string) => {
      return removeSocial(id);
    },
    onSuccess: ({ data }, id) => {
      setSocials((prev) => prev?.filter((pr) => pr.id !== id));
    },
    onError: (error) => {
      ToastError("Failed to remove your social");
    },
  });

  const handleAddSocialAccount = (data: Social) => {
    if (!data) return;
    setSocials((prev) => [...prev, data]);
  };

  const handleRemoveSocial = (
    e: React.MouseEvent<HTMLButtonElement>,
    socialID: string
  ) => {
    e.currentTarget.disabled = true;
    removeMutation.mutate(socialID);
  };

  const [loading, setLoading] = useState(true);

  return session.data?.user !== null ? (
    <>
      <Meta />
      <Nav
        publishing={publishState}
        handleModal={toggleModal}
        state={session.data?.user?.published}
        handlePublish={handlePublishUser}
      />
      {/* Modal for uploading a new profile picture */}
      {modal && (
        <Modal closeModal={toggleModal}>
          <Uploader
            handleUpload={handleFileUpload}
            file={file}
            handleFile={setFile}
          />
        </Modal>
      )}
      {/* Modal for updating your social accounts */}
      {socialModal && (
        <AddSocialContainer
          handleAddSocialAccount={handleAddSocialAccount}
          socials={socials}
          handleToggle={toggleSocialModal}
        />
      )}
      <div className="dark:bg-background min-h-screen min-w-screen flex flex-row pb-10">
        <div className="container mx-auto md:w-[1200px] flex flex-col md:flex-row md:justify-center  px-3.5 md:p-10  md:border dark:border-zinc-700 min-h-full shadow-md rounded-lg">
          <div className="md:w-[20%] w-full mt-3 ">
            <div className="relative">
              {session.data?.user?.image ? (
                <ProfleImage source={session.data?.user?.image} />
              ) : (
                <div
                  className={`hidden md:block bg-zinc-800 w-[140px] h-[140px]  rounded-lg`}
                ></div>
              )}
              <button
                onClick={toggleModal}
                className="absolute top-16 left-12 hidden md:block"
              >
                <Image
                  src="/camera.png"
                  width={30}
                  height={30}
                  alt="Camera icon"
                />
              </button>
            </div>
            <ul className="flex flex-row md:flex-col justify-around border md:border-none mb-2 border-zinc-300 dark:border-zinc-800 rounded-lg items-center md:items-start">
              <li className="md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 dark:text-zinc-200">
                {session.data?.user?.image ? (
                  <Image
                    src={session.data?.user?.image}
                    width={30}
                    height={30}
                    priority
                    onClick={toggleModal}
                    alt="Profile"
                    onLoadingComplete={() => setLoading(false)}
                    className={`rounded-md object-cover md:hidden ${
                      loading ? "grayscale blur-2xl scale-110" : ""
                    }`}
                  />
                ) : null}
              </li>
              <li className="md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 dark:text-zinc-200">
                <Link
                  href="/admin"
                  className={`rounded-md  flex flex-row items-center text-xs  space-x-2  px-2 py-1 ${
                    router.pathname === "/admin"
                      ? "text-primary"
                      : "dark:text-zinc-200 text-zinc-900"
                  }`}
                >
                  {router.pathname === "/admin" ? (
                    <Image src="/auser.png" height={15} width={15} alt="User" />
                  ) : (
                    <Image src="/user.png" height={15} width={15} alt="User" />
                  )}
                  <span className="md:block">Profile</span>
                </Link>
              </li>
              <li className="md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 ">
                <Link
                  href="/admin/integrations"
                  className={`rounded-md  flex flex-row items-center text-xs  space-x-2  px-2 py-1 ${
                    router.pathname === "/admin/integrations"
                      ? "text-primary"
                      : "dark:text-zinc-200 text-zinc-900"
                  }`}
                >
                  {router.pathname === "/admin/integrations" ? (
                    <Image
                      src="/asettings.png"
                      height={15}
                      width={15}
                      alt="User"
                    />
                  ) : (
                    <Image
                      src="/settings.png"
                      height={15}
                      width={15}
                      alt="User"
                    />
                  )}
                  <span className="md:block">Integration</span>
                </Link>
              </li>
              <li className="md:hidden  md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 ">
                <button
                  onClick={toggleSocialModal}
                  className="flex flex-row text-xs text-center dark:text-zinc-200 space-x-2 items-center  text-zinc-900 rounded-lg"
                >
                  <Image src="/add.png" height={15} width={15} alt="User" />
                  <span> Socials</span>
                </button>
              </li>
            </ul>
            <button
              onClick={toggleSocialModal}
              className="md:block hidden text-xs text-center px-2 py-1  bg-primary text-zinc-100 rounded-lg md:w-36 my-1"
            >
              Add social accounts
            </button>
            <hr className="hidden md:block h-px my-4 w-2/3 bg-gray-200 border-0 dark:bg-gray-700" />

            {socials &&
              socials.map((social, index) => {
                const name = socialsTypes.find(
                  (soc) => soc.value === social.name
                )?.name;
                return (
                  <button
                    onClick={(event) => handleRemoveSocial(event, social.id)}
                    key={index}
                    className="hidden disabled:dark:text-zinc-400 disabled:text-zinc-500 disabled:cursor-not-allowed rounded-lg text-xs py-1 px-3 md:block"
                  >
                    {name}
                  </button>
                );
              })}
          </div>
          {children}
        </div>
      </div>
    </>
  ) : null;
};

export default AdminLayout;
