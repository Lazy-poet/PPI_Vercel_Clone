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
            : "flex z-50 fixed justify-between py-3 px-4 w-full border-t-4 border-yellow-300 text-yellow-700 bg-yellow-50"
        }
      >
        <div className="flex items-center mx-auto gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.25697 3.09901C9.02197 1.73901 10.979 1.73901 11.743 3.09901L17.323 13.019C18.073 14.353 17.11 15.999 15.581 15.999H4.41997C2.88997 15.999 1.92697 14.353 2.67697 13.019L8.25697 3.09901ZM11 13C11 13.2652 10.8946 13.5196 10.7071 13.7071C10.5195 13.8947 10.2652 14 9.99997 14C9.73475 14 9.4804 13.8947 9.29286 13.7071C9.10533 13.5196 8.99997 13.2652 8.99997 13C8.99997 12.7348 9.10533 12.4804 9.29286 12.2929C9.4804 12.1054 9.73475 12 9.99997 12C10.2652 12 10.5195 12.1054 10.7071 12.2929C10.8946 12.4804 11 12.7348 11 13ZM9.99997 5.00001C9.73475 5.00001 9.4804 5.10537 9.29286 5.2929C9.10533 5.48044 8.99997 5.73479 8.99997 6.00001V9.00001C8.99997 9.26523 9.10533 9.51958 9.29286 9.70712C9.4804 9.89465 9.73475 10 9.99997 10C10.2652 10 10.5195 9.89465 10.7071 9.70712C10.8946 9.51958 11 9.26523 11 9.00001V6.00001C11 5.73479 10.8946 5.48044 10.7071 5.2929C10.5195 5.10537 10.2652 5.00001 9.99997 5.00001Z"
              fill="currentColor"
            />
          </svg>

          <p className="text-sm font-medium md:my-0 ">
            Claim Now To Beat The April Deadline!
          </p>
        </div>
        <button
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
