import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProgressBar from "@/components/ProgressBar";
import { STEP } from "@/libs/constants";
import Title from "@/components/Title";
import TermsOfService from "@/components/TermsOfService";
import QuickQuote from "@/components/steps/Step1-QuickQuote";
import NextButton from "@/components/NextButton";
import SidePanel from "@/components/SidePanel";
import ClaimNow from "@/components/steps/Step2-ClaimNow";
import SignComplete from "@/components/steps/Step3-SignComplete";
import LastThing from "@/components/steps/Step4-LastThing";
import { NEXT_BUTTON_HELPERS, NEXT_BUTTON_TIMERS } from "@/libs/doms";
import ThankYou from "@/components/steps/Step5-ThankYou";
import StepAlert from "@/components/StepAlert";
import AllDone from "@/components/steps/Step6-AllDone";
import Layout from "@/components/Layout";
import Utils from "../libs/utils";
const isNino = require("is-national-insurance-number");
import { postcodeValidator } from "postcode-validator";
import supabase from "utils/client";
import { useSystemValues } from "@/contexts/ValueContext";
import { Worker } from "@react-pdf-viewer/core";

export default function Claim() {
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
  } = useSystemValues();

  const urlEmail = router.query.email;
  const [step, setStep] = useState<STEP>(STEP.QUICK_QUOTE);
  const [open, setOpen] = useState<Boolean>(false);
  const [fileURL, setFileURL] = useState<String>("terms-of-service.pdf");
  const [checkedYears, setCheckedYears] = useState<string[]>([]);

  const [utmParams, setUtmParams] = useState({});
  const [claimValue, setClaimValue] = useState<number>(0);

  const [theEmail, setTheEmail] = useState("");
  const [prevData, setPrevData] = useState("");

  // Step1
  const [fdEvents1, setFdEvents1] = useState({
    firstName: true,
    lastName: true,
    email: true,
    postCode: true,
    address: true,
    day: true,
    month: true,
    year: true,
  });

  const handleOpen = (type: String) => {
    setFileURL(type);
    setOpen(!open);
  };

  const handleFormChange1 = async (key: string, value: string) => {
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
      ...formData5,
      firstEvent: false,
      [key]: value,
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
    if (step === STEP.QUICK_QUOTE) {
      if (urlEmail) {
        return router.push(`/?email=${urlEmail}`);
      }
      router.push(`/`);
    } else {
      setStep((step) => step - 1);
    }
  };

  const nextStep = async () => {
    let { day, month, year, ...otherFormData1 } = formData1;

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
                link: `https://workfromhome.claimingmadeeasy.com/claim?email=${otherFormData1.email.toLowerCase()}`,
                firstName: otherFormData1.firstName,
                lastName: otherFormData1.lastName,
                email: otherFormData1.email.toLowerCase(),
                postCode: otherFormData1.postCode,
                address: otherFormData1.address,
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
                  email: otherFormData1.email.toLowerCase(),
                  postCode: otherFormData1.postCode,
                  address: otherFormData1.address,
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
        if (formData2.employerName !== null) {
          if (!formData2.claimChecked1 || !formData2.claimChecked2) {
            router.push("/error");
          } else {
            console.log(formData2.employerName?.address);
            const { error } = await supabase
              .from("claim-form-submissions")
              .update({
                claimChecked1: formData2.claimChecked1,
                claimChecked2: formData2.claimChecked2,
                employerName: formData2.employerName?.label,
                employerAddress: formData2.employerName?.address,
              })
              .match({ email: theEmail ?? urlEmail });

            setStep((step) => step + 1);
          }
        }
        break;
      case STEP.SIGN_COMPLETE:
        setFormData3({ ...formData3, firstEvent: false });
        if (formData3.signatureData !== null) {
          console.log(formData3);

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
              signatureUrl: signatureUrlPrefix + data?.path,
            })
            .match({ email: theEmail ?? urlEmail });
          setStep((step) => step + 1);
        }
        break;
      case STEP.LAST_THING:
        setFormData4({ ...formData4, firstEvent: false });
        if (formData4.insurance !== "" && isNino(formData4.insurance)) {
          const { error } = await supabase
            .from("claim-form-submissions")
            .update({ insurance: formData4.insurance })
            .match({ email: theEmail ?? urlEmail });

          setStep((step) => step + 1);
        }
        break;
      case STEP.THANK_YOU:
        setFormData5({ ...formData5, firstEvent: false });
        if (formData5.paye !== "" && Utils.validatePAYE(formData5.paye)) {
          const { error } = await supabase
            .from("claim-form-submissions")
            .update({ paye: formData5.paye })
            .match({ email: theEmail ?? urlEmail });

          setStep((step) => step + 1);
        }
        break;
      case STEP.ALL_DONE:
        router.push("/");
        break;
      default:
        break;
    }
    document.getElementById("btnNext")?.blur();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    /* to check where the user should continue in the form */
    const formPageHandler = (data: any) => {
      if (router.query.step === "1") return setStep(0);
      if (data.paye) return setStep(5);
      if (data.insurance) return setStep(4);
      if (data.signatureData) return setStep(3);
      if (data.employerName) return setStep(2);
      if (data.email) return setStep(1);
    };

    /* get existed user data */
    const getPrevData = async () => {
      const { data, error } = await supabase
        .from("claim-form-submissions")
        .select()
        .match({ email: urlEmail })
        .select();
      setPrevData(data?.[0]);

      const birthdate = JSON.parse(data?.[0]?.birthdate);

      /* update the form data white existed user data */

      setClaimValue(data?.[0]?.claimValue);
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

      setFormData2({
        employerName: data?.[0]?.employerName ? data?.[0].employerName : "",
        claimChecked1: data?.[0]?.claimChecked1 ? data?.[0].claimChecked1 : "",
        claimChecked2: data?.[0]?.claimChecked1 ? data?.[0].claimChecked1 : "",
        firstEvent: formData2.firstEvent,
      });

      setFormData3({
        signatureData: data?.[0]?.signatureData ? data?.[0].signatureData : "",
        firstEvent: formData2.firstEvent,
      });

      setFormData4({
        ...formData4,
        insurance: data?.[0]?.insurance ? data?.[0].insurance : "",
      });

      setFormData5({
        ...formData5,
        paye: data?.[0]?.paye ? data?.[0].paye : "",
      });

      formPageHandler(data?.[0]);
    };

    /* if existed user */
    if (urlEmail) {
      getPrevData();
    }
  }, [urlEmail]);

  useEffect(() => {
    if (!!router.query?.years || !!router.query?.claimValue) {
      setCheckedYears(
        // @ts-ignore
        Array.isArray(router.query.years)
          ? router.query.years
          : [router.query.years]
      );
      // only set claim value if it is not empty and also convert it to number
      if (
        router.query.claimValue &&
        typeof router.query.claimValue === "string"
      ) {
        setClaimValue(parseInt(router.query.claimValue));
      }
    }

    if (!!router.query) {
      let utmParams: any = {};
      Object.keys(router.query).forEach((key) => {
        if (key.startsWith("utm_")) {
          utmParams[key] = router.query[key];
        }
        setUtmParams(utmParams);
      });
    }
  }, [router.query, router]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query?.years && !router.query?.email) {
      router.push("/");
    }

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
    if (!router.isReady) return;
    if (!router.query?.years && !router.query?.email) {
      router.push("/");
    }
  }, [router.isReady, router]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.min.js">
      <Layout>
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

                {(step === STEP.SIGN_COMPLETE ||
                  step === STEP.LAST_THING ||
                  step === STEP.THANK_YOU) && (
                  <StepAlert step={step} data={formData3} />
                )}

                <Title step={step} onClick={handleOpen} />

                {step === STEP.QUICK_QUOTE && (
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
                {step === STEP.SIGN_COMPLETE && (
                  <SignComplete
                    data={formData3}
                    handleFormChange={handleFormChange3}
                  />
                )}
                {step === STEP.LAST_THING && (
                  <LastThing
                    data={formData4}
                    handleFormChange={handleFormChange4}
                  />
                )}
                {step === STEP.THANK_YOU && (
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
                    label={step === STEP.THANK_YOU ? "Submit" : "Next"}
                    helper={NEXT_BUTTON_HELPERS(step, handleOpen)}
                  />
                )}
              </div>
            </div>

            <SidePanel amount={claimValue} step={step} />
          </div>
        </section>
      </Layout>
    </Worker>
  );
}
