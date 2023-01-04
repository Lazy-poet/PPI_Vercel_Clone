import { CONFIRMS } from "@/libs/doms";
import { Card } from "flowbite-react";
import { useState } from "react";
import SignatureCanvas from "../SignatureCanvas";

const SignComplete = ({ data, handleFormChange }: any) => {
  const [reset, setReset] = useState<boolean>(false);

  return (
    <div className="mt-6 mb-10">
      <ul className="space-y-1 list-inside text-gray-500 dark:text-gray-400">
        {CONFIRMS.map((confirm, index) => {
          return (
            <li key={index} className="flex justify-start items-start">
              <svg
                className="w-4 h-4 mt-[5px] mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {confirm}
            </li>
          );
        })}
      </ul>

      <div>
        <h1 className="mt-10 max-w-screen-xl mx-auto text-left mb-4 text-3xl font-extrabold tracking-tight leading-none text-blue-600 dark:text-blue-500">
          Your signature
        </h1>
        <p className="max-w-screen-xl mx-auto text-left font-normal text-gray-500 dark:text-gray-400">
          Please sign in the boundaries of the white box below
        </p>

        <div className="w-full mt-10 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="bg-[#F9FAFB] rounded-t-lg dark:bg-gray-800 relative">
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-1 rounded-lg bg-gray-700 dark:bg-gray-400 pointer-events-none" />
            <SignatureCanvas sendRef={handleFormChange} reset={reset} debounceReset={setReset} />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button onClick={() => setReset(true)} className="inline-flex items-center gap-2 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 darkring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 darktext-white darkbg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-backspace" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z"></path>
                <path d="M12 10l4 4m0 -4l-4 4"></path>
              </svg>
              CLEAR
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SignComplete;
