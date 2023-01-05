import { CONFIRMS } from "@/libs/doms";
import { Card } from "flowbite-react";
import { useState } from "react";
import SignatureCanvas from "../SignatureCanvas";

const SignComplete = ({ data, handleFormChange }: any) => {
  const [reset, setReset] = useState<boolean>(false);

  return (
    <div className="mt-6 mb-10">
      <div>
        <div id="alert-additional-content-4" className="p-4 mb-4 text-yellow-700 border rounded-lg bg-[#fdf6b1] dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800" role="alert">
          <div className="flex items-start">
            <svg aria-hidden="true" className="w-5 h-5 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Use your finger or mouse to draw your signature in the boundaries of the box below</h3>
          </div>
          <div className="mt-2 mb-4 text-md space-y-4 text-center">
            <div className="flex flex-row gap-2 text-lg items-center justify-center">
              Example:
              <img className="w-48 bg-white dark:mix-blend-exclusion rounded-md" src="/images/s-example.png" alt="signature-examele" />
            </div>
          </div>
          {/* <div className="flex">
            <button type="button" className="text-black bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800">
              <svg aria-hidden="true" className="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
              View more
            </button>
          </div> */}
        </div>
        <h1 className="mt-10 max-w-screen-xl mx-auto text-left mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-500 dark:text-gray-400">
          Draw your signature
        </h1>
        {/* <p className="max-w-screen-xl mx-auto text-left font-normal text-gray-500 dark:text-gray-400">
          Use your finger or mouse to draw your signature in the boundaries of the box below
        </p> */}

        <div className="w-full mt-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="bg-[#F9FAFB] rounded-t-lg dark:bg-gray-800 relative">
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-[1px] rounded-lg bg-gray-700 dark:bg-gray-400 pointer-events-none" />
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

        <p className="text-sm text-gray-500 dark:text-gray-400">
          You authorise us to submit these claim documents on your behalf, subject to our terms & conditions
        </p>
      </div>
    </div >
  );
};

export default SignComplete;
