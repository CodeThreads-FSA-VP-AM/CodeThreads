import React from "react";

const Steps: React.FC = () => {
  return (
    <div className="pt-6">
      <h2 className="sr-only">Steps</h2>

      <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-400">
        <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
          <li className="flex items-center gap-2 p-2 bg-white">
            <span className="h-6 w-6 rounded-full bg-green-500 text-center text-[10px] font-bold leading-6 text-white">
              1
            </span>

            <span className="hidden sm:block"> Added </span>
          </li>

          <li className="flex items-center gap-2 p-2 bg-white">
            <span className="h-6 w-6 rounded-full bg-black text-center text-[10px] font-bold leading-6 text-white">
              2
            </span>

            <span className="hidden sm:block"> Processing </span>
          </li>

          <li className="flex items-center gap-2 p-2 bg-white">
            <span className="h-6 w-6 rounded-full bg-black text-center text-[10px] font-bold leading-6 text-white">
              3
            </span>

            <span className="hidden sm:block"> Completed </span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Steps;
