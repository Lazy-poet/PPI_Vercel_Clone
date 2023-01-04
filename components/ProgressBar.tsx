import { STEP } from "@/libs/constants";
import { PERCENTS } from "@/libs/doms";

type Props = {
  step: STEP;
  prevStep: any;
};

const ProgressBar = ({ step, prevStep }: Props) => {
  return (
    <div className="w-full pt-4 mx-auto text-center lg:pt-8">
      <div className="flex justify-between items-center mb-1">
        <button
          className="inline-flex items-center text-sm font-medium text-blue-700 dark:text-white"
          onClick={() => prevStep()}
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          Go back
        </button>

        <span className="text-sm font-medium text-blue-700 dark:text-white ml-auto">
          {PERCENTS[step]}% completed
        </span>
      </div>
      <div className="mb-4 w-full h-2.5 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${PERCENTS[step]}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
