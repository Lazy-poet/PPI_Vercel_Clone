import { STEP } from "@/libs/constants";
import { SUB_TITLES, TITLES } from "@/libs/doms";

type Props = {
  step: STEP;
};

const Title = ({ step }: Props) => {
  return (
    <div className="w-full pt-4 mx-auto text-center lg:pt-8">
      <h1 className="max-w-screen-xl mx-auto text-left mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        <span className="text-blue-600 dark:text-blue-500">{TITLES[step]}</span>
      </h1>
      <p className="max-w-screen-xl mx-auto text-left text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        {SUB_TITLES[step]}
      </p>
    </div>
  );
};

export default Title;
