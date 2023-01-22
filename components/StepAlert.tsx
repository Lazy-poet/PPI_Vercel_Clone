import { STEP } from "@/libs/constants";
import CustomAlertBanner from "./CustomAlert";

type Props = {
  step: STEP;
};

const StepAlert = (props: any) => {
  const { step, data, claimValue } = props;

  return (
    <>
      {step === STEP.SIGNATURE && (
        <>
          {data.firstEvent ||
            (data.signatureData && (
              <CustomAlertBanner
                color="green"
                body={`Great news! You're entitled to claim a £${claimValue} tax refund`}
              />
            ))}
          {!(data.signatureData || data.firstEvent) && (
            <CustomAlertBanner
              closable={false}
              body="Please provide your signature to proceed"
              color="red"
            />
          )}
        </>
      )}
      {[STEP.DETAILS, STEP.CLAIM_NOW].includes(step) && (
        <CustomAlertBanner
          color="green"
          body={`Great news! You're entitled to claim a £${claimValue} tax refund`}
        />
      )}
      {step === STEP.ONE_MORE && (
        <CustomAlertBanner color="blue" body="Only two steps left" />
      )}

      {step === STEP.LASTLY && (
        <CustomAlertBanner body="This is the last question" color="yellow" />
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
