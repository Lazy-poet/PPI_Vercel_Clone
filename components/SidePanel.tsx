import { STEP } from "@/libs/constants";
import { SIDE_INFO } from "@/libs/doms";
import Image from "next/image";
const SideItem = ({ info }: { info: string }) => {
  return (
    <li className="flex items-center space-x-3">
      <svg
        className="flex-shrink-0 w-5 h-5 text-green-300"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span>{info}</span>
    </li>
  );
};

const SidePanel = ({ step, amount }: { step: STEP; amount: number }) => {
  return (
    <div className="side-panel hidden w-full max-w-md p-12 lg:block bg-primary-600 right-0 top-0 h-screen py-32">
      <div className="block p-8 text-white rounded-lg bg-primary-500">
        <figure className="max-w-screen-md">
          <blockquote>
            <p className="text-sm font-medium">
              &ldquo;If you&apos;ve received a PPI payout since April 2016, you
              may be due a refund on the income tax deducted from the interest
              element of the payout.&rdquo;
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
            <div className="flex text-xs items-center divide-x divide-white">
              <cite className="pr-3 font-medium">Martin Lewis</cite>
              <cite className="pl-3 text-xs">Source: ITV News</cite>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default SidePanel;
