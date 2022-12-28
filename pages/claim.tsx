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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";


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
                <ProgressBar step={step} prevStep={prevStep} id='swiper-back' />
              )}
              {(step == STEP.LAST_THING || step == STEP.THANK_YOU) && (
                <StepAlert step={step} />
              )}

        <Swiper 
             autoHeight
             modules={[Pagination, Navigation]}
             navigation={{ nextEl: '#swiper-forward', prevEl: '#swiper-back' }}
             className=" swiper-container mySwiper swiper-autoheight global-form-slider"
        >
           <SwiperSlide>{<QuickQuote />}</SwiperSlide>
           <SwiperSlide>{<ClaimNow />}</SwiperSlide>  
           <SwiperSlide>{<SignComplete />}</SwiperSlide>
           <SwiperSlide>{ <LastThing />}</SwiperSlide>  
           <SwiperSlide>{ <ThankYou />}</SwiperSlide>  
           <SwiperSlide> { <AllDone />}</SwiperSlide>
      </Swiper>
 

              {step != STEP.ALL_DONE && (
                <NextButton
                id={'swiper-forward'}
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