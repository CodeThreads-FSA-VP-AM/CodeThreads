import React, { useEffect } from "react";

import { MdOutlineErrorOutline } from "react-icons/md";
type Props = {
  setError: any;
  error: boolean;
  errorNoti: string;
};

const ErrorNotification = (props: Props) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      props.setError(false);
    }, 3500);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  return (
    <div>
      <section className="z-50 fixed left-0 top-0 p-4">
        <div className="p-4 ml-auto max-w-sm w-full bg-gray-200 rounded-xl shadow-5xl">
          <div className="flex flex-wrap justify-between -m-2">
            <div className="flex-1 p-2">
              <div className="flex flex-wrap -m-2">
                <div className="self-center"></div>
                <div className="flex-1 p-4 px-4">
                  <p className="font-heading mb-1 flex gap-2 text-gray-700 font-semibold">
                    <MdOutlineErrorOutline size={25} color="red" />
                    Error!
                  </p>
                  <p className="text-xs font-medium text-gray-700 pb-2 pl-8">
                    {props.errorNoti}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-auto p-2">
              <button
                className="text-neutral-700 hover:text-red-900"
                onClick={() => props.setError(false)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 13.5L13.5 4.5M4.5 4.5L13.5 13.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorNotification;
