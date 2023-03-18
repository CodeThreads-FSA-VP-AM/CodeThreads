import React from "react";

const Performance: React.FC = () => {
  return (
    <>
      <article className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-lg">
        <span className="p-3 text-blue-600 bg-blue-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">$240.94</p>

          <p className="text-sm text-gray-500">Total Sales</p>
        </div>
      </article>

      <article className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-lg sm:justify-between">
        <span className="p-3 text-blue-600 bg-blue-100 rounded-full sm:order-last">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">$240.94</p>

          <p className="text-sm text-gray-500">Total Sales</p>
        </div>
      </article>
    </>
  );
};

export default Performance;
