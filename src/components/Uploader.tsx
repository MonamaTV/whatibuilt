import Image from "next/image";
import React, { useEffect, useState } from "react";

type UploadTypes = {
  file: File | undefined;
  handleFile: (file: File | undefined) => void;
  closeModal: () => void;
  sizeLimit?: number;
  handleUpload: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Uploader = ({
  file,
  handleFile,
  closeModal,
  handleUpload,
}: UploadTypes) => {
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
    <div className="fixed top-0 left-0 w-screen min-h-screen bg-zinc-500/75 z-10 flex flex-col items-center justify-center transition-all px-3.5 shadow-lg shadow-white">
      <button
        onClick={closeModal}
        className="border border-red-500 px-3 py-1 relative text-red-500 top-10 md:left-[408px] left-[138px] hover:bg-red-500 hover:text-white transition-colors ease-in-out duration-200"
      >
        Close
      </button>
      <label
        onDragOver={handleDragStart}
        onDragLeave={handleDragEnd}
        onDrop={handleDrop}
        htmlFor="upload"
        id="dropzone"
        className="border-dashed w-full md:w-[900px] h-[600px] bg-background flex flex-col justify-center items-center space-y-3 cursor-pointer hover:cursor-copy border-primary"
      >
        {!file ? (
          <>
            <h4 className="text-3xl font-bold text-white">UPLOAD</h4>
            <p className="text-sm text-zinc-400">
              Click or <span className="text-zinc-200">drag and drop</span>
            </p>
            <p className="text-sm text-zinc-400">SVG. PNG. JPG.</p>
            <p className="text-sm text-zinc-400">Less than 4MB</p>
          </>
        ) : (
          <>
            <Image src={fileUrl ?? ""} width="300" height={"300"} alt="Image" />
            <button
              onClick={handleUpload}
              className="bg-primary text-white px-3 py-2 w-[300px] text-center md:w-1/3 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed"
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
    </div>
  );
};

export default Uploader;
