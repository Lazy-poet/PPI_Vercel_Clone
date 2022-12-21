import { ERRORS } from "@/libs/doms";

const ErrorContent = () => {
  return (
    <div className="mt-6 mb-5 space-y-5">
      <ul className="space-y-1 list-inside text-gray-500 dark:text-gray-400">
        {ERRORS.map((error, index) => {
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
              {error}
            </li>
          );
        })}
      </ul>
      <ul className="space-y-5 list-inside text-gray-500 dark:text-gray-400">
        <li className="flex justify-start items-start">
          You have selected &apos;No&apos; to claiming a full WFH allowance
          (since 6 April 2020) on the previous page. As a result, we are unable
          to proceed with a tax refund claim on your behalf.
        </li>
        <li className="flex justify-start items-start">
          If you have made an error in your selection, please click on the
          &apos;Restart application&apos; button to start again.
        </li>
      </ul>
    </div>
  );
};

export default ErrorContent;
