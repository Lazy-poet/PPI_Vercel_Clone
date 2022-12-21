import { STEP } from "@/libs/constants";

type Props = {
  step: STEP;
};

const StepAlert = ({ step }: Props) => {
  return (
    <>
      {step == STEP.LAST_THING && (
        <div className="w-full pt-4 mx-auto lg:pt-8">
          <div
            className="p-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
            role="alert"
          >
            Only two steps left
          </div>
        </div>
      )}
      {step == STEP.THANK_YOU && (
        <div className="w-full pt-4 mx-auto lg:pt-8">
          <div
            className="p-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
          >
            This is the last question
          </div>
        </div>
      )}
    </>
  );
};

export default StepAlert;
