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
import Utils from "../libs/utils";
const isNino = require('is-national-insurance-number');
import { postcodeValidator } from 'postcode-validator';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";


export default function Claim() {
  const router = useRouter();
  const [step, setStep] = useState<STEP>(STEP.QUICK_QUOTE);
  const [slide, setslide] = useState(false)
  // Step1
  const [formData1, setFormData1] = useState<any>({
    firstEvent: true,
    firstName: '',
    lastName: '',
    email: '',
    postCode: '',
    address: '',
    day: '',
    month: '',
    year: ''
  });
  const [fdEvents1, setFdEvents1] = useState<any>({
    firstName: true,
    lastName: true,
    email: true,
    postCode: true,
    address: true,
    day: true,
    month: true,
    year: true
  });
  const handleFormChange1 = (key: string, value: string) => {
    setFormData1({
      ...formData1,
      // firstEvent: false,
      [key]: value
    });
    setFdEvents1({
      ...fdEvents1,
      [key]: false
    });
  }
  // Step2
  const [formData2, setFormData2] = useState<any>({
    firstEvent: true,
    employerName: null
  });
  const handleFormChange2 = (key: string, value: any) => {
    setFormData2({
      ...formData2,
      firstEvent: false,
      [key]: value
    });
  }

  // Step4
  const [formData4, setFormData4] = useState<any>({
    firstEvent: true,
    insurance: ''
  });
  const handleFormChange4 = (key: string, value: string) => {
    setFormData4({
      ...formData4,
      firstEvent: false,
      [key]: value
    });
  }

  // Step5
  const [formData5, setFormData5] = useState<any>({
    firstEvent: true,
    paye: ''
  });
  const handleFormChange5 = (key: string, value: string) => {
    setFormData5({
      ...formData5,
      firstEvent: false,
      [key]: value
    });
  }

  const prevStep = () => {
    if (step == STEP.QUICK_QUOTE) {
      router.push("/");
    } else {
      setStep((step) => step - 1);
    }
  };

  const nextStep = () => {
    switch (step) {
      case STEP.QUICK_QUOTE:
        setFormData1({ ...formData1, firstEvent: false });
        setFdEvents1({
          firstName: false,
          lastName: false,
          email: false,
          postCode: false,
          address: false,
          day: false,
          month: false,
          year: false
        });
        if (formData1.firstName !== '' && formData1.lastName !== '' && formData1.email !== '' && Utils.validateEmail(formData1.email) && formData1.postCode !== '' && postcodeValidator(formData1.postCode, 'GB') && formData1.address !== '' && formData1.day !== '' && formData1.month !== '' && formData1.year !== '') {
          setStep((step) => step + 1);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        break;
      case STEP.CLAIM_NOW:
        setFormData2({ ...formData2, firstEvent: false });
        if (formData2.employerName !== null) {
          setStep((step) => step + 1);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        break;
      case STEP.SIGN_COMPLETE:
        setStep((step) => step + 1);
        break;
      case STEP.LAST_THING:
        setFormData4({ ...formData4, firstEvent: false });
        if (formData4.insurance !== '' && isNino(formData4.insurance)) {
          setStep((step) => step + 1);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        break;
      case STEP.THANK_YOU:
        setFormData5({ ...formData5, firstEvent: false });
        if (formData5.paye !== '' && Utils.validatePAYE(formData5.paye)) {
          setStep((step) => step + 1);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        break;
      case STEP.ALL_DONE:
        router.push("/");
        break;
      default:
        break;
    }
    // 
    document.getElementById('swiper-forward')?.blur();
    setslide(false)
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
           <SwiperSlide>{<QuickQuote slide={slide} data={formData1} fdEvents={fdEvents1} handleFormChange={handleFormChange1} />}</SwiperSlide>
           <SwiperSlide>{<ClaimNow slide={slide} data={formData2} handleFormChange={handleFormChange2} />}</SwiperSlide>  
           <SwiperSlide>{<SignComplete slide={slide} />}</SwiperSlide>
           <SwiperSlide>{ <LastThing slide={slide} data={formData4} handleFormChange={handleFormChange4} />}</SwiperSlide>  
           <SwiperSlide>{ <ThankYou slide={slide} data={formData5} handleFormChange={handleFormChange5} />}</SwiperSlide>  
           <SwiperSlide> { <AllDone slide={slide} />}</SwiperSlide>
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