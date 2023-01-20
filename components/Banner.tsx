import React, { useEffect, useRef, useState } from "react";

type Props = {};

const Banner = (props: Props) => {
  const [height, setHeight] = useState(50);
  const banner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const listener = () => {
      if (banner.current) {
        setHeight(banner.current!.offsetHeight);
      }
    };
    listener();
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [banner]);

  const [showBanner, setShowBanner] = React.useState(true);
  return (
    <div
      className="w-full bg-gray-50 dark:bg-gray-800 transition-all h-12"
      style={{ height }}
    >
      <div
        id="banner"
        ref={banner}
        tabIndex={-1}
        className={
          !showBanner
            ? "hidden"
            : "flex z-50 fixed justify-between py-3 px-4 w-full bg-[#FDF6B2] border-b border-gray-200 dark:border-gray-700"
        }
      >
        <div className="flex items-center mx-auto gap-2">
          <svg
            width={20}
            height={18}
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99999 6.99999V8.99999M9.99999 13H10.01M3.07199 17H16.928C18.468 17 19.43 15.333 18.66 14L11.732 1.99999C10.962 0.666994 9.03799 0.666994 8.26799 1.99999L1.33999 14C0.569985 15.333 1.53199 17 3.07199 17Z"
              stroke="#111928"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-sm font-semibold text-black md:my-0 ">
            {/* <span className="hidden md:inline-flex bg-primary-100 text-primary-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
              New
            </span> */}
            You Must Claim Now To Beat The April Deadline!
          </p>
        </div>
        <button
          onClick={() => {
            setShowBanner(false);
            setHeight(0);
          }}
          data-collapse-toggle="banner"
          type="button"
          className="inline-flex justify-center items-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Banner;
