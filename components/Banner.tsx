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
            : "flex z-50 fixed justify-between py-3 px-4 w-full bg-gray-50 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800"
        }
      >
        <div className="flex items-center mx-auto gap-2">
          <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6V10M10 14H10.01M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
              stroke="#FACA15"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p className="text-sm font-medium text-[#FACA15] md:my-0 ">
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
          className="inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Banner;
