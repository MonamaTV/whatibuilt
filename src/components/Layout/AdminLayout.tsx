import { updateUser } from "@/services/user";
import { supabase } from "@/utils/supabase";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
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

const AdminLayout = ({ children }: PropsWithChildren) => {
  const [file, setFile] = useState<File | undefined>();
  const router = useRouter();
  const session = useSession({ required: true });
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => {
    setModal(!modal);
  };

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
  });

  const handlePublishUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (session?.data === null) return;
    e.currentTarget.disabled = true;
    updateMutation.mutate(!session?.data.user?.published);
    e.currentTarget.disabled = false;
  };

  return session.data?.user !== null ? (
    <>
      <Nav
        handleModal={toggleModal}
        state={session.data?.user?.published}
        handlePublish={handlePublishUser}
      />
      {modal && (
        <Modal closeModal={toggleModal}>
          <Uploader
            handleUpload={handleFileUpload}
            file={file}
            handleFile={setFile}
          />
        </Modal>
      )}
      <div className="dark:bg-background min-h-screen min-w-screen flex flex-row pb-10">
        <div className="container mx-auto md:w-[1200px] flex flex-col md:flex-row md:justify-center  px-3.5 md:p-10  md:border dark:border-zinc-700 min-h-full shadow-md rounded-lg">
          <div className="md:w-[20%] w-full mt-3 ">
            <div className="relative">
              {session.data?.user?.image ? (
                <ProfleImage source={session.data?.user?.image} />
              ) : (
                <div
                  className={`hidden md:block bg-zinc-800 w-[140px] h-[140px] animate-pulse rounded-lg`}
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
                    onClick={toggleModal}
                    alt="Profile"
                    className="rounded-md object-cover md:hidden"
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
              <li className="md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1">
                <Link
                  href="/admin/socials"
                  className={`rounded-md  flex flex-row items-center text-xs  space-x-2  px-2 py-1 ${
                    router.pathname === "/admin/socials"
                      ? "text-primary"
                      : "dark:text-zinc-200 text-zinc-900"
                  }`}
                >
                  {router.pathname === "/admin/socials" ? (
                    <Image
                      src="/asocial.png"
                      height={15}
                      width={15}
                      alt="User"
                    />
                  ) : (
                    <Image
                      src="/social.png"
                      height={15}
                      width={15}
                      alt="User"
                    />
                  )}
                  <span className="md:block">Socials</span>
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
            </ul>
          </div>
          {children}
        </div>
      </div>
    </>
  ) : null;
};

export default AdminLayout;
