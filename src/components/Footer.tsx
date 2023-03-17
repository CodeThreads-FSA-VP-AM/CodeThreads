import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <>
      <div className="mx-auto container py-16 xl:px-20 lg:px-12 sm:px-6 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-4">
          <div className="flex flex-col flex-shrink-0">
            <div>
              <p className="font-bold text-2xl">codeThreads</p>
            </div>
            <p className="text-sm leading-none text-gray-800 mt-4">
              Copyright © 2023 codeThreads
            </p>
            <p className="text-sm leading-none text-gray-800 mt-4">
              All rights reserved
            </p>
          </div>

          <div className="sm:ml-0 ml-8">
            <h2 className="text-base font-bold leading-4 text-gray-800">
              Vincent Palomo
            </h2>
            <a
              href="https://github.com/vincentpalomo"
              target="_blank"
              className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer flex flex-row gap-2"
            >
              <FaGithub /> Github
            </a>
            <a
              href="https://www.linkedin.com/in/vincent-palomo/"
              target="_blank"
              className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer flex flex-row gap-2"
            >
              <FaLinkedin color="blue" /> LinkedIn
            </a>
            <a
              href="mailto: vincentpalomo@yahoo.com"
              target="_blank"
              className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer flex flex-row gap-2"
            >
              <HiOutlineMail color="red" /> Mail
            </a>
          </div>
          <div>
            <h2 className="text-base font-bold leading-4 text-gray-800">
              Aswin Malla
            </h2>
            <a
              href="https://github.com/amt98"
              target="_blank"
              className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer flex flex-row gap-2"
            >
              <FaGithub /> Github
            </a>
            <a
              href="https://www.linkedin.com/in/aswinmalla/"
              target="_blank"
              className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer flex flex-row gap-2"
            >
              <FaLinkedin color="blue" /> LinkedIn
            </a>
            <a
              href="mailto: aswinmalla12@gmail.com"
              target="_blank"
              className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer flex flex-row gap-2"
            >
              <HiOutlineMail color="red" /> Mail
            </a>
          </div>
        </div>
      </div>
      <ul className="flex flex-wrap justify-start gap-4 text-xs lg:justify-center">
        <li>
          <p className="text-gray-500 transition hover:opacity-75 cursor-pointer">
            Terms & Conditions
          </p>
        </li>

        <li>
          <p className="text-gray-500 transition hover:opacity-75 cursor-pointer">
            Privacy Policy
          </p>
        </li>

        <li>
          <p className="text-gray-500 transition hover:opacity-75 cursor-pointer">
            Cookies
          </p>
        </li>
      </ul>
    </>
  );
};

export default Footer;
