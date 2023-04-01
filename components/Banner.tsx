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
            : "flex z-50 fixed justify-between py-3 px-2 sm:px-4 w-full text-red-800 bg-red-50"
        }
      >
        <div className="flex items-center mx-auto gap-2">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>

          <p className="text-sm font-medium md:my-0">
            9 out of 10 claimants receive a tax refund
          </p>
        </div>
        <button
          aria-label="close"
          onClick={() => {
            setShowBanner(false);
            setHeight(0);
          }}
          data-collapse-toggle="banner"
          type="button"
          className="inline-flex justify-center items-center text-red-500 hover:bg-red-200 rounded-lg text-sm p-1.5"
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
