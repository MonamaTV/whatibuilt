import React from "react";

type ModalTypes = {
  closeModal: () => void;
  children?: React.ReactNode;
};

const Modal = ({ closeModal, children }: ModalTypes) => {
  return (
    <div className="fixed top-0 left-0 w-screen min-h-screen bg-zinc-500/75 z-10 flex flex-col items-center justify-center transition-all px-3.5 shadow-lg shadow-white ">
      <button
        onClick={closeModal}
        className="border border-red-500 px-3 py-1 relative text-red-500 top-10 md:left-[408px] left-[138px] hover:bg-red-500 hover:text-white transition-colors ease-in-out duration-200 rounded-md text-sm"
      >
        Close
      </button>

      {children}
    </div>
  );
};

export default Modal;
