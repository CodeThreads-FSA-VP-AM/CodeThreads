import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Footer: React.FC = () => {
  return (
    <>
      <div className='container z-50 flex flex-col items-center justify-center px-4 pt-16 pb-2 mx-auto xl:px-20 lg:px-12 sm:px-6'>
        <div className='flex flex-wrap gap-4 md:justify-start'>
          <div className='flex flex-col mx-5'>
            <p className='text-xl font-bold'>codeThreads</p>
            <p className='mt-4 text-sm leading-none text-gray-800'>Copyright © 2023 codeThreads</p>
            <p className='mt-4 text-sm leading-none text-gray-800'>All rights reserved</p>
          </div>
          <div className='flex flex-wrap gap-2 md:gap-12 justify-center items-center mx-5'>
            <div>
              <h2 className='text-base font-bold leading-4 text-gray-800'>Vincent Palomo</h2>
              <a
                href='https://github.com/vincentpalomo'
                target='_blank'
                className='flex flex-row gap-2 mt-6 text-base leading-4 text-gray-800 cursor-pointer hover:text-gray-500'
              >
                <FaGithub /> Github
              </a>
              <a
                href='https://www.linkedin.com/in/vincent-palomo/'
                target='_blank'
                className='flex flex-row gap-2 mt-6 text-base leading-4 text-gray-800 cursor-pointer hover:text-gray-500'
              >
                <FaLinkedin color='blue' /> LinkedIn
              </a>
              <a
                href='mailto: vincentpalomo@yahoo.com'
                target='_blank'
                className='flex flex-row gap-2 mt-6 text-base leading-4 text-gray-800 cursor-pointer hover:text-gray-500'
              >
                <HiOutlineMail color='red' /> Mail
              </a>
            </div>
            <div>
              <h2 className='text-base font-bold leading-4 text-gray-800'>Aswin Malla</h2>
              <a
                href='https://github.com/amt98'
                target='_blank'
                className='flex flex-row gap-2 mt-6 text-base leading-4 text-gray-800 cursor-pointer hover:text-gray-500'
              >
                <FaGithub /> Github
              </a>
              <a
                href='https://www.linkedin.com/in/aswinmalla/'
                target='_blank'
                className='flex flex-row gap-2 mt-6 text-base leading-4 text-gray-800 cursor-pointer hover:text-gray-500'
              >
                <FaLinkedin color='blue' /> LinkedIn
              </a>
              <a
                href='mailto: aswinmalla12@gmail.com'
                target='_blank'
                className='flex flex-row gap-2 mt-6 text-base leading-4 text-gray-800 cursor-pointer hover:text-gray-500'
              >
                <HiOutlineMail color='red' /> Mail
              </a>
            </div>
          </div>
        </div>
        <div className='pt-6'>
          <ul className='flex flex-wrap justify-start gap-4 text-xs lg:justify-center'>
            <li>
              <p className='text-gray-500 transition cursor-pointer hover:opacity-75'>Terms & Conditions</p>
            </li>

            <li>
              <p className='text-gray-500 transition cursor-pointer hover:opacity-75'>Privacy Policy</p>
            </li>

            <li>
              <p className='text-gray-500 transition cursor-pointer hover:opacity-75'>Cookies</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
