import { STEP } from "@/libs/constants";

type Props = {
  step: STEP;
};

const StepAlert = (props: any) => {
  const { step, data } = props

  return (
    <>
      {step == STEP.SIGN_COMPLETE && (
        <>
          {data.firstEvent ? (
            <></>
          ) : !data.signatureData ? (
            <div className="w-full mt-10 mx-auto flex p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Please provide your signature to proceed</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
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
