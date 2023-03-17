import React from "react";
import { Link } from "react-router-dom";
import Banners from "./Banners";
import JoinNow from "./JoinNow";
import Socials from "./Socials";
import { FaGithub } from "react-icons/fa";

type Props = {};

const Home = (props: Props) => {
  return (
    <section className="px-4 mx-auto max-w-screen-2xl md:px-8">
      <div className="flex flex-wrap justify-between mb-8 md:mb-16">
        <div className="flex flex-col justify-center w-full mb-6 lg:w-1/3 lg:pt-48 lg:pb-24 sm:mb-12 lg:mb-0">
          <h1 className="mb-4 text-4xl font-bold text-black-800 sm:text-5xl md:text-6xl md:mb-8">
            Find your
            <br />
            style online
          </h1>

          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            Welcome to our online clothing store! Browse our collection of
            stylish and comfortable clothes designed to fit your unique sense of
            fashion. From trendy tops to cozy sweaters, we have everything you
            need to create your perfect outfit. Start shopping now and find your
            next wardrobe essential!
          </p>
        </div>

        <div className="flex w-full mb-12 lg:w-2/3 md:mb-16">
          <div className="relative z-10 -ml-12 overflow-hidden bg-gray-100 rounded-lg shadow-lg top-12 md:top-16 left-12 md:left-16 lg:ml-0">
            <img
              src="https://images.unsplash.com/photo-1542340916-951bb72c8f74?auto=format&q=75&fit=crop&w=550&h=550"
              loading="lazy"
              alt=""
              className="object-cover object-center w-full h-full"
            />
          </div>

          <div className="overflow-hidden bg-gray-100 rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1586295166487-b265f7e83a7f?auto=format&q=75&fit=crop&w=550&h=550"
              loading="lazy"
              alt=""
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex w-64 h-12 overflow-hidden border divide-x rounded-lg">
          <Link
            to="/products"
            className="flex items-center justify-center w-1/3 text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Men
          </Link>
          <Link
            to="/products"
            className="flex items-center justify-center w-1/3 text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Women
          </Link>
          <Link
            to="/featured"
            className="flex items-center justify-center w-1/3 text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Featured
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 lg:justify-start">
          <span className="text-sm font-semibold tracking-widest text-gray-400 uppercase sm:text-base">
            GitHub
          </span>
          <span className="w-12 h-px bg-gray-200"></span>

          <div className="flex gap-4">
            <a
              href="https://github.com/CodeThreads-FSA-VP-AM/CodeThreads"
              target="_blank"
              className="hover:text-gray-500 text-base leading-4 text-gray-800 cursor-pointer flex flex-row gap-2"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <JoinNow />
      <Banners />
      <Socials />
    </section>
  );
};

export default Home;
