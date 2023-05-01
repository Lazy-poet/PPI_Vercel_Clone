import Trustpilot from "./Trustpilot";
import { useSystemValues } from "@/contexts/ValueContext";
import Image from "next/image";
const MarketingBanner = () => {
  const { ready } = useSystemValues();
  return (
    <>
      {ready && (
        <div
          id="marketing-banner"
          tabIndex={-1}
          className="sm:hidden relative z-10 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-5 mx-4 bg-[#FCE96A] border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl dark:border-gray-600"
        >
          <div className="flex flex-col items-start md:items-center md:flex-row text-gray-900">
            <>
              <div className="text-center flex flex-col gap-1 items-center justify-center w-full">
                <div className="text-xs text-left">
                  <Trustpilot />
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketingBanner;
