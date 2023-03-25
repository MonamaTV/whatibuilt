import ProfleImage from "@/components/ProfilePicture";
import Uploader from "@/components/Uploader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";
import Nav from "@/components/Nav";
import { supabase } from "@/utils/supabase";
import path from "path";
import { updateUser } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { User } from "@prisma/client";
import { ToastError, ToastSuccess } from "@/components/Toasts/Toasts";

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

  return (
    true && (
      <>
        <Nav handleModal={toggleModal} />
        {modal && (
          <Uploader
            handleUpload={handleFileUpload}
            file={file}
            handleFile={setFile}
            closeModal={toggleModal}
          />
        )}
        <div className="dark:bg-background min-h-screen min-w-screen flex flex-row pb-10 ">
          <div className="container mx-auto md:w-[1200px] flex flex-col md:flex-row md:justify-center dark:md:bg-zinc-900 px-3.5 md:p-10  md:border dark:border-none min-h-full">
            <div className="md:w-[20%] w-full mt-3 ">
              <div className="relative">
                <ProfleImage source={session.data?.user?.image} />
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
              <ul className="flex flex-row md:flex-col justify-around border md:border-none mb-2 border-zinc-300">
                <li className="md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 dark:text-gray-200">
                  <Link
                    href="/admin"
                    className={`text-gray-900 flex flex-row items-center text-xs dark:text-gray-300 space-x-2  px-2 py-1 ${
                      router.pathname === "/admin"
                        ? "dark:bg-zinc-800 bg-zinc-800 text-zinc-200"
                        : ""
                    }`}
                  >
                    <span className="md:block">Profile</span>
                  </Link>
                </li>
                <li className="md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 dark:text-gray-200">
                  <Link
                    href="/admin/socials"
                    className={`text-gray-900 flex flex-row items-center text-xs dark:text-gray-200 space-x-2  px-2 py-1 ${
                      router.pathname === "/admin/socials"
                        ? "dark:bg-zinc-800 bg-zinc-800 text-zinc-200"
                        : ""
                    }`}
                  >
                    <span className="md:block">Socials</span>
                  </Link>
                </li>
                <li className="md:pl-0 md:px-4 px-2 py-1 text-sm md:w-36 my-1 dark:text-gray-200">
                  <Link
                    href="/admin/integrations"
                    className={`text-gray-900 flex flex-row items-center text-xs dark:text-gray-200 space-x-2  px-2 py-1 ${
                      router.pathname === "/admin/integrations"
                        ? "dark:bg-zinc-800 bg-zinc-800 text-zinc-200"
                        : ""
                    }`}
                  >
                    <span className="md:block">Integration</span>
                  </Link>
                </li>
              </ul>
            </div>
            {children}
          </div>
        </div>
      </>
    )
  );
};

export default AdminLayout;
