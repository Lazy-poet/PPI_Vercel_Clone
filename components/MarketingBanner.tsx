import Trustpilot from "./Trustpilot";
import { useSystemValues } from "@/contexts/ValueContext";

const MarketingBanner = () => {
  const { ready } = useSystemValues();
  return (
    <div
      id="marketing-banner"
      tabIndex={-1}
      className="sm:hidden relative z-10 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-5 mx-4 bg-[#FCE96A] border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl dark:border-gray-600"
    >
      <div className="flex flex-col items-start md:items-center md:flex-row text-gray-900">
        {!ready ? (
          <p className="flex gap-1 items-center text-sm font-normal">
            <svg
              className="flex-shrink-0 w-5 h-5"
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
            86% of customers end up with a tax rebate
          </p>
        ) : (
          <div className="text-center flex flex-col gap-1 items-center justify-center w-full">
            <p>Our largest HMRC refund</p>
            <p className="text-3xl font-semibold">
              <span className="text-lg font-medium">£</span>11,767.
              <span className="text-lg font-medium">69</span>
            </p>
            <div className="mt-2 text-xs text-left">
              <Trustpilot />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingBanner;
