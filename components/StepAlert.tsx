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
                body={`Great news! You're entitled to claim a £${claimValue} tax refund`}
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
      {step === STEP.CLAIM_NOW && (
        <>
          {earningsData.earnings === Earnings.MoreThan150001 && (
            <CustomAlertBanner
              color="red"
              body="Sorry! because you earn more than £150,001 you’re not eligible to claim 😔"
              closable={false}
            />
          )}
        </>
      )}
      {STEP.DETAILS === step && (
        <CustomAlertBanner
          color="green"
          body={`Great news! You're entitled to claim a £${claimValue} tax refund`}
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
