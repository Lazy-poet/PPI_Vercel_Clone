import React from "react";

type Props = {
  children?: React.ReactNode;
  text?: string;
  error?: boolean;
  success?: boolean;
};

const InputHelper = ({ text, error, success, children }: Props) => {
  if (!text && !children) return null;
  return (
    <p
      id="helper-text-explanation"
      className={`mt-2 text-sm flex gap-1  ${
        error
          ? "text-red-600 dark:text-red-500"
          : success
          ? "text-gray-500 dark:text-gray-400"
          : "text-gray-500 dark:text-gray-400"
      }`}
    >
      <svg
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="min-w-[20px] w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        ></path>
      </svg>
      {text && <span dangerouslySetInnerHTML={{ __html: text }} />}
      <span>{children && children}</span>
    </p>
  );
};

export default InputHelper;
