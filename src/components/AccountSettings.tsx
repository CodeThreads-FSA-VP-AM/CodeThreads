import React, { useEffect, useState } from "react";
import { updateProfile } from "../api/api";
type Props = {
  user: any;
  token: string;
  setUser: any;
};
const AccountSettings: React.FC<Props> = (props) => {
  const [username, setUsername] = useState(props.user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(props.user.email);
  const [avatar, setAvatar] = useState(props.user.avatar_url);
  const [errorMsg, setErrorMsg] = useState("");
  const [userId, setUserId] = useState(props.user.id);

  const handleEditProfile: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const data = await updateProfile({
        username,
        password,
        email,
        avatar,
        userId,
        token: props.token,
      });
      if (data.error) {
        setErrorMsg(data.error);
      } else {
        props.setUser(data.userUpdate);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {}, [props.user, props.token]);
  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div>
        <div className="m-5 md:col-span-2 md:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Welcome to your profile settings
                </p>
              </div>
            </div>
            <form onSubmit={handleEditProfile}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                  <div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        New username<span className="text-[#F70000]">*</span>
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        New password<span className="text-[#F70000]">*</span>
                      </label>
                      <input
                        type="password"
                        name="last-name"
                        id="last-name"
                        autoComplete="given-name"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        New email address
                        <span className="text-[#F70000]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Photo
                    </label>
                    <div className="flex items-center mt-2">
                      <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                        <img
                          className="object-cover w-12 h-12 rounded-full"
                          src={props.user.avatar_url}
                          alt="default"
                        />
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Change your profile picture
                    </label>

                    <div className="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Paste a URL link</span>
                            <input
                              id="url-input"
                              name="url-input"
                              type="text"
                              className="border-gray-300 rounded-md"
                              value={avatar}
                              onChange={(e) => setAvatar(e.target.value)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Change
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
