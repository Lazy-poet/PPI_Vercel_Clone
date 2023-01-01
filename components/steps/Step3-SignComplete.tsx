import { CONFIRMS } from "@/libs/doms";
import { Card } from "flowbite-react";
import SignatureCanvas from "../SignatureCanvas";

const SignComplete = ({ data, handleFormChange }: any) => {
  return (
    <div className="mt-6 mb-5">
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

      <div className="space-y-1">
        <h1 className="mt-10 max-w-screen-xl mx-auto text-left mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-blue-600 dark:text-blue-500">
          Your signature
        </h1>
        <p className="max-w-screen-xl mx-auto text-left text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Please sign in the boundaries of the white box below
        </p>
        <Card>
          <SignatureCanvas sendRef={handleFormChange} />
        </Card>
      </div>
    </div>
  );
};

export default SignComplete;
