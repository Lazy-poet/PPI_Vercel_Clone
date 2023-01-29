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
            : "flex z-50 fixed justify-between py-3 px-2 sm:px-4 w-full text-yellow-700 bg-yellow-50"
        }
      >
        <div className="flex items-center mx-auto gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM9 12C9 12.2652 8.89464 12.5196 8.70711 12.7071C8.51957 12.8946 8.26522 13 8 13C7.73478 13 7.48043 12.8946 7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929C7.48043 11.1054 7.73478 11 8 11C8.26522 11 8.51957 11.1054 8.70711 11.2929C8.89464 11.4804 9 11.7348 9 12ZM8 3C7.73478 3 7.48043 3.10536 7.29289 3.29289C7.10536 3.48043 7 3.73478 7 4V8C7 8.26522 7.10536 8.51957 7.29289 8.70711C7.48043 8.89464 7.73478 9 8 9C8.26522 9 8.51957 8.89464 8.70711 8.70711C8.89464 8.51957 9 8.26522 9 8V4C9 3.73478 8.89464 3.48043 8.70711 3.29289C8.51957 3.10536 8.26522 3 8 3Z"
              fill="currentColor"
            />
          </svg>

          <p className="text-sm font-medium md:my-0">
            CLAIM NOW TO BEAT THE 5 APRIL DEADLINE
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
          className="inline-flex justify-center items-center text-yellow-500 hover:bg-yellow-200 rounded-lg text-sm p-1.5"
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
