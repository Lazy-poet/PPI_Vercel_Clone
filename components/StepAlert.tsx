import { STEP } from "@/libs/constants";
import CustomAlertBanner from "./CustomAlert";
import { Earnings } from "./steps/Step1-ClaimNow";

type Props = {
  step: STEP;
};

const StepAlert = (props: any) => {
  const { step, signatureData, earningsData, claimValue } = props;

  return (
    <>
      {step === STEP.SIGNATURE && (
        <>
          {signatureData.firstEvent ||
            (signatureData.signatureData && (
              <CustomAlertBanner
                color="green"
                // body={`Great news! You're entitled to claim a £${claimValue} tax refund`}
                body={`Great news! You're entitled to claim a PPI tax refund`}
              />
            ))}
          {!(signatureData.signatureData || signatureData.firstEvent) && (
            <CustomAlertBanner
              closable={false}
              body="Please provide your signature to proceed"
              color="red"
            />
          )}
        </>
      )}
      {STEP.DETAILS === step && (
        <CustomAlertBanner
          color="green"
          // body={`Great news! You're entitled to claim a £${claimValue} tax refund`}
          body={`Great news! You're entitled to claim a PPI tax refund`}
        />
      )}
      {step === STEP.ONE_MORE && (
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
