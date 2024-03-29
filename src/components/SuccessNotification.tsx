import React, { useEffect } from "react";

type Props = {
  setSuccess: any;
  success: boolean;
  successMsg: string;
  successTitle: string;
};

const SuccessNotification = (props: Props) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      props.setSuccess(false);
    }, 2500);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  return (
    <>
      {props.success && (
        <div className="z-50 fixed left-0 top-0 p-4">
          <div className="w-full max-w-xl p-6 mt-auto ml-auto bg-gray-200 rounded-lg">
            <div className="flex items-start justify-between -mx-2">
              <div className="flex items-start px-2">
                <span className="flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.72 8.79L10.43 13.09L8.78 11.44C8.69036 11.3353 8.58004 11.2503 8.45597 11.1903C8.33191 11.1303 8.19678 11.0965 8.05906 11.0912C7.92134 11.0859 7.78401 11.1091 7.65568 11.1594C7.52736 11.2096 7.41081 11.2859 7.31335 11.3833C7.2159 11.4808 7.13964 11.5974 7.08937 11.7257C7.03909 11.854 7.01589 11.9913 7.02121 12.1291C7.02653 12.2668 7.06026 12.4019 7.12028 12.526C7.1803 12.65 7.26532 12.7604 7.37 12.85L9.72 15.21C9.81344 15.3027 9.92426 15.376 10.0461 15.4258C10.1679 15.4755 10.2984 15.5008 10.43 15.5C10.6923 15.4989 10.9437 15.3947 11.13 15.21L16.13 10.21C16.2237 10.117 16.2981 10.0064 16.3489 9.88458C16.3997 9.76272 16.4258 9.63201 16.4258 9.5C16.4258 9.36799 16.3997 9.23728 16.3489 9.11542C16.2981 8.99356 16.2237 8.88296 16.13 8.79C15.9426 8.60375 15.6892 8.49921 15.425 8.49921C15.1608 8.49921 14.9074 8.60375 14.72 8.79ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                      fill="#54D62C"
                    ></path>
                  </svg>
                </span>
                <div className="ml-2">
                  <h5 className="font-semibold text-gray-700">
                    {props.successTitle}
                  </h5>
                  <span className="text-xs font-medium text-gray-700">
                    {props.successMsg}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <button
                  className="inline-block text-gray-600 hover:text-gray-700"
                  onClick={() => props.setSuccess(false)}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.17501 5.99999L10.7583 2.42499C10.9153 2.26807 11.0034 2.05524 11.0034 1.83333C11.0034 1.61141 10.9153 1.39858 10.7583 1.24166C10.6014 1.08474 10.3886 0.996582 10.1667 0.996582C9.94476 0.996582 9.73193 1.08474 9.57501 1.24166L6.00001 4.82499L2.42501 1.24166C2.26809 1.08474 2.05526 0.996582 1.83334 0.996582C1.61143 0.996582 1.3986 1.08474 1.24168 1.24166C1.08476 1.39858 0.9966 1.61141 0.9966 1.83333C0.9966 2.05524 1.08476 2.26807 1.24168 2.42499L4.82501 5.99999L1.24168 9.57499C1.16357 9.65246 1.10157 9.74463 1.05927 9.84618C1.01696 9.94773 0.995178 10.0566 0.995178 10.1667C0.995178 10.2767 1.01696 10.3856 1.05927 10.4871C1.10157 10.5887 1.16357 10.6809 1.24168 10.7583C1.31915 10.8364 1.41131 10.8984 1.51286 10.9407C1.61441 10.983 1.72333 11.0048 1.83334 11.0048C1.94335 11.0048 2.05227 10.983 2.15382 10.9407C2.25537 10.8984 2.34754 10.8364 2.42501 10.7583L6.00001 7.17499L9.57501 10.7583C9.65248 10.8364 9.74465 10.8984 9.8462 10.9407C9.94775 10.983 10.0567 11.0048 10.1667 11.0048C10.2767 11.0048 10.3856 10.983 10.4872 10.9407C10.5887 10.8984 10.6809 10.8364 10.7583 10.7583C10.8364 10.6809 10.8984 10.5887 10.9408 10.4871C10.9831 10.3856 11.0048 10.2767 11.0048 10.1667C11.0048 10.0566 10.9831 9.94773 10.9408 9.84618C10.8984 9.74463 10.8364 9.65246 10.7583 9.57499L7.17501 5.99999Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessNotification;
