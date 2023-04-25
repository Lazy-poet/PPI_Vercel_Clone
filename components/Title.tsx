import { useSystemValues } from "@/contexts/ValueContext";
import { STEP } from "@/libs/constants";
import { SUB_TITLES, TITLES } from "@/libs/doms";

type Props = {
  step: STEP;
  onClick?: any;
};

const Title = ({ step, onClick }: Props) => {
  const { userData } = useSystemValues();
  return (
    <div className="w-full pt-4 mx-auto text-center lg:pt-8">
      <h1 className="max-w-screen-xl mx-auto text-left mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {TITLES[step]}
      </h1>
      <p className="max-w-screen-xl mx-auto text-left text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        {SUB_TITLES(step, onClick, userData.firstName)}
      </p>
    </div>
  );
};

export default Title;
