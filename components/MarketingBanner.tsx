import Image from "next/image";
import HeaderReview from "../public/images/reviews-logo-inline.png";
import { useSystemValues } from "@/contexts/ValueContext";

const MarketingBanner = () => {
  const { ready } = useSystemValues();
  return (
    <div
      id="marketing-banner"
      tabIndex={-1}
      className="sm:hidden relative z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 mx-4 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="flex flex-col items-start md:items-center md:flex-row text-gray-500 dark:text-gray-400">
        {!ready ? (
          <p className="flex items-center text-sm font-normal">
            86% of customers end up with a tax rebate
          </p>
        ) : (
          <div className="text-center flex flex-col gap-1 items-center justify-center w-full">
            <p>Our largest HMRC refund</p>
            <p className="text-3xl font-semibold">
              <span className="text-lg font-medium">£</span>11767.
              <span className="text-lg font-medium">69</span>
            </p>
            <Image className="w-48 mx-4" src={HeaderReview} alt="uk logo" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingBanner;
