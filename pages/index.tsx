import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProgressBar from "@/components/ProgressBar";
import { STEP } from "@/libs/constants";
import Title from "@/components/Title";
import TermsOfService from "@/components/TermsOfService";
import QuickQuote from "@/components/steps/Step1-Details";
import NextButton from "@/components/NextButton";
import SidePanel from "@/components/SidePanel";
import ClaimNow from "@/components/steps/Step2-ClaimNow";
import SignComplete from "@/components/steps/Step3-Signature";
import LastThing from "@/components/steps/Step4-OneMore";
import { NEXT_BUTTON_HELPERS, NEXT_BUTTON_TIMERS } from "@/libs/doms";
import ThankYou, { TAX_YEARS } from "@/components/steps/Step5-Lastly";
import StepAlert from "@/components/StepAlert";
import AllDone from "@/components/steps/Step6-AllDone";
import ClaimLayout from "@/components/Layout";
import HomeLayout from "@/components/HomeLayout";
import Utils from "../libs/utils";
const isNino = require("is-national-insurance-number");
import { postcodeValidator } from "postcode-validator";
import supabase from "utils/client";
import { useSystemValues } from "@/contexts/ValueContext";
import { Worker } from "@react-pdf-viewer/core";
import HeroSection from "@/components/HeroSection";
import ReviewSection from "@/components/ReviewSection";
import CustomAlert from "@/components/CustomAlert";
import Banner from "@/components/Banner";
type ClaimProps = {
  setReady: Dispatch<SetStateAction<boolean>>;
};
function Claim({ setReady }: ClaimProps) {
  const router = useRouter();

  const {
    formData1,
    setFormData1,
    formData2,
    setFormData2,
    formData3,
    setFormData3,
    formData4,
    setFormData4,
    formData5,
    setFormData5,
    fdEvents1,
    setFdEvents1,
    claimValue,
  } = useSystemValues();

  const [step, setStep] = useState<STEP>(STEP.CLAIM_NOW);
  const [open, setOpen] = useState<Boolean>(false);
  const [fileURL, setFileURL] = useState<String>("terms-of-service.pdf");
  const { checkedYears } = useSystemValues();
  const [utmParams, setUtmParams] = useState({});

  const [theEmail, setTheEmail] = useState<string | null>(null);
  const [urlEmail, setUrlEmail] = useState<string | null>(null);
  const [prevData, setPrevData] = useState("");

  // Step1

  const handleOpen = (type: String) => {
    setFileURL(type);
    setOpen(!open);
  };

  const handleFormChange1 = (key: string, value: string) => {
    setFormData1({
      ...formData1,
      firstEvent: false,
      [key]: value,
    });
    if (key === "day" || key === "month" || key === "year") {
      setFdEvents1({
        ...fdEvents1,
        day: false,
        month: false,
        year: false,
      });
    } else {
      setFdEvents1({
        ...fdEvents1,
        [key]: false,
      });
    }
  };

  // Step2
  const handleFormChange2 = (key: string, value: string) => {
    setFormData2({
      ...formData2,
      firstEvent: false,
      [key]: value,
    });
  };

  // Step3
  const handleFormChange3 = (newSignatureData: string) => {
    setFormData3({
      ...formData2,
      signatureData: newSignatureData,
      firstEvent: false,
    });
  };

  // Step4
  const handleFormChange4 = (key: string, value: string) => {
    setFormData4({
      ...formData4,
      firstEvent: false,
      [key]: value,
    });
  };

  // Step5
  const handleFormChange5 = (key: string, value: string) => {
    setFormData5({
      firstEvents: {
        ...formData5.firstEvents,
        [key]: false,
      },
      tax_years: {
        ...formData5.tax_years,
        [key]: value,
      },
    });
  };

  const calculateCustomerValue = (value: number) => {
    let percentage = 20;
    return +((value / 100) * percentage).toFixed(2);
  };

  const calculateOurFee = (value: number) => {
    let feePercentage = 48;
    return +((calculateCustomerValue(value) / 100) * feePercentage).toFixed(2);
  };

  const base64ToFile = async (base64String: string) =>
    new File(
      [await fetch(base64String).then((res) => res.blob())],
      `${+new Date()}.png`
    );

  const prevStep = () => {
    if (step === STEP.DETAILS) {
      setReady(false);
    } else {
      setStep((step) => step - 1);
    }
  };

  const nextStep = async () => {
    let { day, month, year, ...otherFormData1 } = formData1;

    switch (step) {
      case STEP.DETAILS:
        setFormData1({ ...formData1, firstEvent: false });
        setFdEvents1({
          firstName: false,
          lastName: false,
          email: false,
          postCode: false,
          address: false,
          day: false,
          month: false,
          year: false,
        });
        if (
          formData1.firstName !== "" &&
          formData1.lastName !== "" &&
          formData1.email !== "" &&
          Utils.validateEmail(formData1.email) &&
          formData1.postCode !== "" &&
          postcodeValidator(formData1.postCode, "GB") &&
          formData1.address !== "" &&
          formData1.day !== "" &&
          formData1.month !== "" &&
          formData1.year !== ""
        ) {
          if (!theEmail) {
            let { data, error } = await supabase
              .from("claim-form-submissions")
              .insert({
                ...utmParams,
                claimValue,
                checkedYears,
                ourFee: calculateOurFee(+claimValue),
                customerValue: calculateCustomerValue(+claimValue),
                link: `https://workfromhome.claimingmadeeasy.com/?email=${otherFormData1.email}`,
                firstName: otherFormData1.firstName,
                lastName: otherFormData1.lastName,
                email: otherFormData1.email,
                postCode: otherFormData1.postCode,
                address: otherFormData1.address,
                birthdate_str: `${day}/${month}/${year}`,
                birthdate: JSON.stringify({
                  day,
                  month,
                  year,
                }),
              })
              .select("email");

            setTheEmail(data?.[0].email);

            if (
              error?.message ===
              'duplicate key value violates unique constraint "claim-form-submissions_email_key"'
            ) {
              const { error } = await supabase
                .from("claim-form-submissions")
                .update({
                  claimValue,
                  checkedYears,
                  ourFee: calculateOurFee(+claimValue),
                  customerValue: calculateCustomerValue(+claimValue),
                  firstName: otherFormData1.firstName,
                  lastName: otherFormData1.lastName,
                  email: otherFormData1.email,
                  postCode: otherFormData1.postCode,
                  address: otherFormData1.address,
                  birthdate_str: `${day}/${month}/${year}`,
                  birthdate: JSON.stringify({
                    day,
                    month,
                    year,
                  }),
                })
                .match({ email: otherFormData1.email });
            }
            setStep((step) => step + 1);
          }

          if (theEmail) {
            const { error } = await supabase
              .from("claim-form-submissions")
              .update({
                claimValue,
                checkedYears,
                ourFee: calculateOurFee(+claimValue),
                customerValue: calculateCustomerValue(+claimValue),
                firstName: otherFormData1.firstName,
                lastName: otherFormData1.lastName,
                email: otherFormData1.email,
                postCode: otherFormData1.postCode,
                address: otherFormData1.address,
                birthdate_str: `${day}/${month}/${year}`,
                birthdate: JSON.stringify({
                  day,
                  month,
                  year,
                }),
              })
              .match({ email: theEmail });
            setTheEmail(otherFormData1.email);
            setStep((step) => step + 1);
          }
        }
        break;
      case STEP.CLAIM_NOW:
        setFormData2({ ...formData2, firstEvent: false });
        if (formData2.earnings) {
          const { error } = await supabase
            .from("claim-form-submissions")
            .update({
              claimChecked1: formData2.claimChecked1 ?? false,
              claimChecked2: formData2.claimChecked2 ?? false,
              employerName: formData2.employerName?.label,
              employerAddress: formData2.employerName?.address,
            })
            .match({ email: theEmail ?? urlEmail });

          if (!formData2.claimChecked1 || !formData2.claimChecked2) {
            router.push("/error");
          } else {
            setStep((step) => step + 1);
          }
        }
        break;
      case STEP.SIGNATURE:
        setFormData3({ ...formData3, firstEvent: false });
        if (formData3.signatureData) {

          const signatureUrlPrefix =
            "https://rzbhbpskzzutuagptiqq.supabase.co/storage/v1/object/public/signatures/";

          const { data } = await supabase.storage
            .from("signatures")
            .upload(
              `claim-form/${+new Date()}.png`,
              await base64ToFile(formData3.signatureData)
            );

          const { error } = await supabase
            .from("claim-form-submissions")
            .update({
              signatureData: formData3.signatureData,
              signatureUrl: signatureUrlPrefix + data?.path,
            })
            .match({ email: theEmail ?? urlEmail });
          setStep((step) => step + 1);
        }
        break;
      case STEP.ONE_MORE:
        setFormData4({ ...formData4, firstEvent: false });
        if (formData4.insurance && isNino(formData4.insurance)) {
          const { error } = await supabase
            .from("claim-form-submissions")
            .update({ insurance: formData4.insurance })
            .match({ email: theEmail ?? urlEmail });

          setStep((step) => step + 1);
        }
        break;
      case STEP.LASTLY:
        setFormData5({
          ...formData5,
          firstEvents: Object.keys(TAX_YEARS).reduce((obj, key) => {
            obj[key] = false;
            return obj;
          }, {} as Record<string, boolean>),
        });
        // check if all tax years are filled
        const can_proceed = Object.keys(TAX_YEARS).every(
          (key) => !!formData5.tax_years[key]
        );
        if (can_proceed) {
          const { error } = await supabase
            .from("claim-form-submissions")
            .update({ tax_years: formData5.tax_years })
            .match({ email: theEmail ?? urlEmail });

          setStep((step) => step + 1);
        }
        break;
      case STEP.ALL_DONE:
        setReady(false);
        break;
      default:
        break;
    }
    document.getElementById("btnNext")?.blur();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    // always scroll to top on step change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    /* to check where the user should continue in the form */
    const formPageHandler = (data: any) => {
      if (router.query.step === "1") return setStep(0);
      if (data.tax_years) return setStep(5);
      if (data.insurance) return setStep(4);
      if (data.signatureData) return setStep(3);
      if (data.earnings) return setStep(2);
      if (data.email) return setStep(1);
    };

    /* get existed user data */
    const getPrevData = async () => {
      const { data, error } = await supabase
        .from("claim-form-submissions")
        .select()
        .match({ email: urlEmail })
        .select();
      if (!data?.length) {
        return;
      }
      setPrevData(data?.[0]);

      const birthdate = JSON.parse(data?.[0]?.birthdate);

      /* update the form data with existing user data */

      setFormData1({
        firstEvent: true,
        firstName: data?.[0]?.firstName ? data?.[0].firstName : "",
        lastName: data?.[0].lastName ? data?.[0].lastName : "",
        email: data?.[0].email ? data?.[0].email : "",
        postCode: data?.[0].postCode ? data?.[0].postCode : "",
        address: data?.[0].address ? data?.[0].address : "",
        day: data?.[0].birthdate ? birthdate.day : "",
        month: data?.[0].birthdate ? birthdate.month : "",
        year: data?.[0].birthdate ? birthdate.year : "",
      });
      setFdEvents1({
        firstName: false,
        lastName: false,
        email: false,
        postCode: false,
        address: false,
        day: false,
        month: false,
        year: false,
      });
      setFormData2({
        employerName: data?.[0]?.employerName || "",
        earnings: data?.[0]?.earnings || "",
        claimChecked1: data?.[0]?.claimChecked1 ?? true,
        claimChecked2: data?.[0]?.claimChecked1 ?? true,
        firstEvent: !data?.[0]?.employerName,
      });

      setFormData3({
        signatureData: data?.[0]?.signatureData || "",
        firstEvent: !data?.[0]?.signatureData,
      });

      setFormData4({
        ...formData4,
        insurance: data?.[0]?.insurance || "",
        firstEvent: !data?.[0]?.insurance,
      });

      setFormData5({
        tax_years: data?.[0]?.tax_years ? data[0].tax_years : {},
        // if a key in tax_years has been previously filled, set its firstEvent to false and vice-versa

        firstEvents: Object.keys(TAX_YEARS).reduce((obj, key) => {
          obj[key] = !data[0].tax_years[key];
          return obj;
        }, {} as Record<string, boolean>),
      });

      formPageHandler(data?.[0]);
    };

    /* if existed user */
    if (urlEmail) {
      getPrevData();
    }
  }, [urlEmail]);

  useEffect(() => {
    if (!!router.query) {
      let utmParams: any = {};
      Object.keys(router.query).forEach((key) => {
        if (key.startsWith("utm_")) {
          utmParams[key] = router.query[key];
        }
        setUtmParams(utmParams);
      });

      if (!!router.query.email) {
        // @ts-ignore
        setUrlEmail(router.query.email);
      }
    }
  }, [router.query, router]);

  useEffect(() => {
    if (!router.isReady) return;

    // Initiate validation for doing backup
    if (
      formData1.firstName !== "" &&
      formData1.lastName !== "" &&
      formData1.email !== "" &&
      Utils.validateEmail(formData1.email) &&
      formData1.postCode !== "" &&
      postcodeValidator(formData1.postCode, "GB") &&
      formData1.address !== "" &&
      formData1.day !== "" &&
      formData1.month !== "" &&
      formData1.year !== ""
    ) {
      setFormData1({ ...formData1, firstEvent: false });
      setFdEvents1({
        firstName: false,
        lastName: false,
        email: false,
        postCode: false,
        address: false,
        day: false,
        month: false,
        year: false,
      });
    }
  }, [router.isReady, router]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.min.js">
      <ClaimLayout>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl mx-auto lg:flex">
            <div className="flex items-start mx-auto md:w-[42rem] px-4 md:px-8 xl:px-0">
              <div className="w-full">
                <ProgressBar step={step} goToPrevStep={prevStep} />

                <TermsOfService
                  fileURL={fileURL}
                  open={open}
                  handleOpen={handleOpen}
                />

                <StepAlert
                  step={step}
                  data={formData3}
                  claimValue={claimValue}
                />

                <Title step={step} onClick={handleOpen} />

                {step === STEP.DETAILS && (
                  <QuickQuote
                    data={formData1}
                    fdEvents={fdEvents1}
                    handleFormChange={handleFormChange1}
                  />
                )}
                {step === STEP.CLAIM_NOW && (
                  <ClaimNow
                    data={formData2}
                    handleFormChange={handleFormChange2}
                  />
                )}
                {step === STEP.SIGNATURE && (
                  <SignComplete
                    data={formData3}
                    handleFormChange={handleFormChange3}
                  />
                )}
                {step === STEP.ONE_MORE && (
                  <LastThing
                    data={formData4}
                    handleFormChange={handleFormChange4}
                  />
                )}
                {step === STEP.LASTLY && (
                  <ThankYou
                    data={formData5}
                    handleFormChange={handleFormChange5}
                  />
                )}
                {step === STEP.ALL_DONE && <AllDone />}

                {step !== STEP.ALL_DONE && (
                  <NextButton
                    onClick={nextStep}
                    timer={NEXT_BUTTON_TIMERS[step]}
                    label={step === STEP.LASTLY ? "Submit" : "Next"}
                    helper={NEXT_BUTTON_HELPERS(step, handleOpen)}
                  />
                )}
              </div>
            </div>

            <SidePanel amount={claimValue} step={step} />
          </div>
        </section>
      </ClaimLayout>
    </Worker>
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);
  return (
    <div className="relative">
      <Banner />
      {ready ? (
        <Claim setReady={setReady} />
      ) : (
        <HomeLayout>
          <HeroSection
            handleStart={() => {
              setReady(true);
            }}
          />
          <ReviewSection />
        </HomeLayout>
      )}
    </div>
  );
}
