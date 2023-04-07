import Image from "next/image";
import React, { useEffect, useState } from "react";

type UploadTypes = {
  file: File | undefined;
  handleFile: (file: File | undefined) => void;
  sizeLimit?: number;
  handleUpload: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Uploader = ({ file, handleFile, handleUpload }: UploadTypes) => {
  const [fileUrl, setFileUrl] = useState<string>();

  useEffect(() => {
    setFileUrl("");
    handleFile(undefined);
  }, []);

  const handleDragStart = (e: React.DragEvent) => {
    e.currentTarget.classList.add("border-2");
    e.preventDefault();
  };
  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("border-2");
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-2");
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (file.size >= 1024 * 1024 * 2) {
      return;
    }
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    handleFile(file);
  };

  const handlePickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file.size >= 1024 * 1024 * 2) {
      return;
    }
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    handleFile(file);
  };
  return (
    <>
      <label
        onDragOver={handleDragStart}
        onDragLeave={handleDragEnd}
        onDrop={handleDrop}
        htmlFor="upload"
        id="dropzone"
        className="border-dashed w-full md:w-[900px] h-[600px] dark:bg-background bg-zinc-200 flex flex-col justify-center items-center space-y-3 cursor-pointer hover:cursor-copy border-primary rounded-lg"
      >
        {!file ? (
          <>
            <h4 className="text-3xl font-bold dark:text-white text-zinc-900">
              UPLOAD
            </h4>
            <p className="text-sm text-zinc-400">
              Click or{" "}
              <span className="dark:text-zinc-200 text-zinc-800">
                drag and drop
              </span>
            </p>
            <p className="text-sm dark:text-zinc-400 text-zinc-400">
              SVG. PNG. JPG.
            </p>
            <p className="text-sm dark:text-zinc-400 text-zinc-400">
              Less than 4MB
            </p>
          </>
        ) : (
          <>
            <Image
              src={fileUrl ?? ""}
              width="300"
              height={"300"}
              alt="Image"
              className="rounded-lg"
            />
            <button
              onClick={handleUpload}
              className="bg-primary text-zinc-200 px-3 py-2 w-[300px] text-center md:w-1/3 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed rounded-lg"
            >
              Upload
            </button>
          </>
        )}
      </label>
      <input
        className="hidden"
        type={"file"}
        accept={"image/png image/svg, image/jpg"}
        id="upload"
        onChange={handlePickFile}
      />
    </>
  );
};

export default Uploader;
