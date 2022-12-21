import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
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
import ErrorContent from "@/components/steps/Step-Error";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

export default function Error() {
  const router = useRouter();

  const restart = () => {
    router.push("/claim");
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      <Header />

      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto lg:flex gap-2">
          <div className="flex items-start mx-auto md:w-[42rem] px-4 md:px-8 xl:px-0">
            <div className="w-full">
              <Title step={STEP.ERROR} />

              <ErrorContent />

              <NextButton onClick={restart} label="Restart application" />
            </div>
          </div>
        </div>
      </section>

      <ReviewSection />

      <Footer />
    </main>
  );
}
