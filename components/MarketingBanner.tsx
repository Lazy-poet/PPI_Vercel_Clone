import Trustpilot from "./Trustpilot";
import { useSystemValues } from "@/contexts/ValueContext";
import Image from "next/image";
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
          <>
            <figure className="max-w-screen-md">
              <blockquote>
                <p className="text-sm font-medium text-gray-900">
                  &ldquo;If you&apos;ve received a PPI payout since April 2016,
                  you may be due a refund on the income tax deducted from the
                  interest element of the payout.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center mt-3 space-x-3">
                <Image
                  src="/images/profile/martin lewis.jpeg"
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                  alt="profile picture"
                />
                <div className="flex text-xs items-center divide-x divide-gray-900">
                  <cite className="pr-3 font-medium text-gray-900">
                    Martin Lewis
                  </cite>
                  <cite className="pl-3 text-xs text-gray-900">
                    Source: ITV News
                  </cite>
                </div>
              </figcaption>
            </figure>
          </>
        ) : (
          <>
            <div className="text-center flex flex-col gap-1 items-center justify-center w-full">
              <div className="text-xs text-left">
                <Trustpilot />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MarketingBanner;
