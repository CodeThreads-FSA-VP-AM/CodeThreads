import React, { ReactNode, useState } from "react";

interface ModalProps {
  modalTitle: string;
  modalTxt: string;
  children: ReactNode;
  submitBtnText: string;
  handleSubmit: any;
  showModal: any;
  setShowModal: any;
}
const Modal = ({
  modalTxt,
  children,
  submitBtnText,
  handleSubmit,
  showModal,
  setShowModal,
  modalTitle,
}: ModalProps) => {
  return (
    <>
      <button
        className="bg-indigo-600 text-white text-sm px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {modalTitle}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden backdrop-blur-[5px] overflow-y-auto- fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative m-auto max-w-md">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xs text-red-600 font-semibold">
                    {modalTxt}
                  </h3>
                </div>
                <div className="relative p-4 flex-auto">
                  <div className="text-xs  text-black">{children}</div>
                </div>
                <div className="flex items-center justify-end  border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-indigo-600 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    {submitBtnText}
                  </button>
                  <button
                    className="bg-red-600 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default Modal;
