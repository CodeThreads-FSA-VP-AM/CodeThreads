import React, { ReactNode } from "react";

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
        className="px-4 py-1 mb-1 mr-1 text-sm text-white transition-all duration-150 ease-linear bg-indigo-600 rounded shadow outline-none hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {modalTitle}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden backdrop-blur-[5px] overflow-y-auto- fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative max-w-md m-auto">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-xs font-semibold text-red-600">
                    {modalTxt}
                  </h3>
                </div>
                <div className="relative flex-auto p-4">
                  <div className="text-xs text-black">{children}</div>
                </div>
                <div className="flex items-center justify-end border-t border-solid rounded-b border-slate-200">
                  <button
                    className="px-6 py-3 my-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-indigo-600 rounded shadow outline-none hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(e);
                    }}
                  >
                    {submitBtnText}
                  </button>
                  <button
                    className="px-6 py-3 my-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-600 rounded shadow outline-none hover:shadow-lg focus:outline-none"
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
