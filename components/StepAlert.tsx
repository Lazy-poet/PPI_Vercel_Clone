import { STEP } from "@/libs/constants";
import CustomAlertBanner from "./CustomAlert";
import { useSystemValues } from "@/contexts/ValueContext";

const StepAlert = ({ step }: { step: STEP }) => {
  const { firstEvents, userData } = useSystemValues();
  return (
    <>
      {step === STEP.SIGNATURE && (
        <>
          {!(userData.signatureData || firstEvents.signatureData) && (
            <CustomAlertBanner
              closable={false}
              body="Please provide your signature to proceed"
              color="red"
            />
          )}
        </>
      )}
      {step === STEP.INSURANCE && (
        <CustomAlertBanner color="blue" body="Only two steps left" />
      )}
      {step === STEP.REFUNDS && (
        <CustomAlertBanner body="This is the last question" color="blue" />
      )}
      {step === STEP.ALL_DONE && (
        <CustomAlertBanner
          color="green"
          body={`Your tax claim information has been received`}
        />
      )}
    </>
  );
};

export default StepAlert;
