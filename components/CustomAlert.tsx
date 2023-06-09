import { useState } from "react";

type Props = {
  body: string;
  color: string;
  closable?: boolean;
};

const CustomAlert = ({ body, color, closable = true }: Props) => {
  const [hideAlert, setHideAlert] = useState(false);
  return (
    <div
      className={
        hideAlert
          ? "hidden"
          : `flex p-4 mb-2 mt-5  ${
              color === "red"
                ? "text-red-700 dark:text-red-700"
                : `text-${color}-800  dark:text-${color}-400`
            } bg-${color}-50 border-t-4 border-${color}-300 dark:border-${color}-800 dark:bg-gray-800`
      }
      role="alert"
      id="banner-alert"
      hidden={hideAlert}
    >
      {/* ADDING THIS EMPTY DIV WITH DYNAMIC TO BE USED TO PREVENT TAILWIND FROM PURGING THEM */}
      <div className="text-blue-800 dark:text-blue-400 text-green-800 dark:text-green-400 text-yellow-800 dark:text-yellow-400 text-red-700 dark:text-red-700 border-blue-300 border-yellow-300 border-red-300 border-green-300 dark:border-blue-800 dark:border-yellow-800 dark:border-red-800 dark:border-green-800" />
      <svg
        className="flex-shrink-0 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div
        className="ml-3 text-sm text-left font-medium"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {closable && (
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 bg-${color}-50 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-${color}-300 dark:hover:bg-gray-700`}
          data-dismiss-target="#banner-alert"
          aria-label="Close"
          onClick={() => setHideAlert(true)}
        >
          <span className="sr-only">Dismiss</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default CustomAlert;
