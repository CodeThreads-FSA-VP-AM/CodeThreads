import React from "react";

const Banners = () => {
  return (
    <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
      <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
        <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative border rounded-sm shadow-md">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">
              Jackets
            </h1>
            <p className="text-base lg:text-xl text-gray-800">
              Save Upto <span className="font-bold">30%</span>
            </p>
          </div>
          <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0 md:w-6/12">
            <img
              src="http://www.hardcorecustoms.com/wp-content/uploads/2016/03/leatherjacket-test.png"
              alt=""
              className="md:w-20 md:h-20 lg:w-full lg:h-full"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12 border rounded-full shadow-md">
          <div className="flex flex-col justify-center md:w-1/2">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">
              Best Deal
            </h1>
            <p className="text-base lg:text-xl text-gray-800 mt-2">
              Save upto <span className="font-bold">50%</span>
            </p>
          </div>
          <div className="md:w-[22%] mt-8 md:mt-0 flex justify-center md:justify-end">
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
              className="border rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
