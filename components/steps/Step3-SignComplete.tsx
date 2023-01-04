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
        <h1 className="mt-10 max-w-screen-xl mx-auto text-left mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white text-blue-600 dark:text-blue-500">
          Your signature
        </h1>
        <p className="max-w-screen-xl mx-auto text-left font-normal text-gray-500 dark:text-gray-400">
          Please sign in the boundaries of the white box below
        </p>

        <div className="w-full mt-10 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="bg-white rounded-t-lg dark:bg-gray-800">
            <SignatureCanvas sendRef={handleFormChange} reset={reset} debounceReset={setReset} />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button onClick={() => setReset(true)} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignComplete;
