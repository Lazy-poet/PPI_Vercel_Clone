import { STEP } from "@/libs/constants";
import CustomAlertBanner from "./CustomAlert";

type Props = {
  step: STEP;
};

const StepAlert = (props: any) => {
  const { step, data } = props;

  return (
    <>
      {step === STEP.SIGN_COMPLETE && (
        <>
          {data.firstEvent ? (
            <></>
          ) : !data.signatureData ? (
            <CustomAlertBanner
              closable={false}
              body="Please provide your signature to proceed"
              color="red"
            />
          ) : (
            <></>
          )}
        </>
      )}
      {step === STEP.LAST_THING && (
        <CustomAlertBanner color="blue" body="Only two steps left" />
      )}
      {step === STEP.THANK_YOU && (
        <CustomAlertBanner body="This is the last question" color="yellow" />
      )}
    </>
  );
};

export default StepAlert;
