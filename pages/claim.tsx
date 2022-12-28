import { useState } from "react";
import { useRouter } from "next/router";
import ProgressBar from "@/components/ProgressBar";
import { STEP } from "@/libs/constants";
import Title from "@/components/Title";
import QuickQuote from "@/components/steps/Step1-QuickQuote";
import NextButton from "@/components/NextButton";
import SidePanel from "@/components/SidePanel";
import ReviewSection from "@/components/ReviewSection";
import ClaimNow from "@/components/steps/Step2-ClaimNow";
import SignComplete from "@/components/steps/Step3-SignComplete";
import LastThing from "@/components/steps/Step4-LastThing";
import { NEXT_BUTTON_HELPERS } from "@/libs/doms";
import ThankYou from "@/components/steps/Step5-ThankYou";
import StepAlert from "@/components/StepAlert";
import AllDone from "@/components/steps/Step6-AllDone";
import Layout from "@/components/Layout";

export default function Claim() {
  const router = useRouter();
  const [step, setStep] = useState<STEP>(STEP.QUICK_QUOTE);

  const prevStep = () => {
    if (step == STEP.QUICK_QUOTE) {
      router.push("/");
    } else {
      setStep((step) => step - 1);
    }
  };

  const nextStep = () => {
    if (step == STEP.ALL_DONE) {
      router.push("/");
    } else {
      setStep((step) => step + 1);
    }
  };

  return (
    <Layout>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto lg:flex gap-2">
          <div className="flex items-start mx-auto md:w-[42rem] px-4 md:px-8 xl:px-0">
            <div className="w-full">
              {step < STEP.LAST_THING && (
                <ProgressBar step={step} prevStep={prevStep} />
              )}
              {(step == STEP.LAST_THING || step == STEP.THANK_YOU) && (
                <StepAlert step={step} />
              )}

              <Title step={step} />

              {step == STEP.QUICK_QUOTE && <QuickQuote />}
              {step == STEP.CLAIM_NOW && <ClaimNow />}
              {step == STEP.SIGN_COMPLETE && <SignComplete />}
              {step == STEP.LAST_THING && <LastThing />}
              {step == STEP.THANK_YOU && <ThankYou />}
              {step == STEP.ALL_DONE && <AllDone />}

              {step != STEP.ALL_DONE && (
                <NextButton
                  onClick={nextStep}
                  label={step == STEP.THANK_YOU ? "Submit" : "Next"}
                  helper={NEXT_BUTTON_HELPERS[step]}
                />
              )}
            </div>
          </div>

          <SidePanel step={step} />
        </div>
      </section>

      <ReviewSection />
    </Layout>
  );
}
