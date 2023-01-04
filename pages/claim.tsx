import { useEffect, useState } from "react";
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
const isNino = require("is-national-insurance-number");
import { postcodeValidator } from "postcode-validator";
import supabase from "utils/client";

export default function Claim() {
  const router = useRouter();

  const urlEmail = router.query.email;
  const [step, setStep] = useState<STEP>(STEP.QUICK_QUOTE);
  const [checkedYears, setCheckedYears] = useState<string[]>([]);

  const [utmParams, setUtmParams] = useState<any>([]);
  const [claimValue, setClaimValue] = useState<any>(624);

  const [theEmail, setTheEmail] = useState<any>("");
  const [prevData, setPrevData] = useState<any>("");

  // Step1
  const [formData1, setFormData1] = useState<any>({
    firstEvent: true,
    firstName: "",
    lastName: "",
    email: "",
    postCode: "",
    address: "",
    day: "",
    month: "",
    year: "",
  });

  const [fdEvents1, setFdEvents1] = useState<any>({
    firstName: true,
    lastName: true,
    email: true,
    postCode: true,
    address: true,
    day: true,
    month: true,
    year: true,
  });

  const handleFormChange1 = async (key: string, value: string) => {
    setFormData1({
      ...formData1,
      // firstEvent: false,
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
  const [formData2, setFormData2] = useState<any>({
    firstEvent: true,
    employerName: null,
    claimChecked1: true,
    claimChecked2: true,
  });
  const handleFormChange2 = (key: string, value: any) => {
    setFormData2({
      ...formData2,
      firstEvent: false,
      [key]: value,
    });
  };

  // Step3
  const [formData3, setFormData3] = useState<any>({
    signatureData: null,
  });
  const handleFormChange3 = (newSignatureData: string) => {
    setFormData3({ signatureData: newSignatureData });
  };

  // Step4
  const [formData4, setFormData4] = useState<any>({
    firstEvent: true,
    insurance: "",
  });
  const handleFormChange4 = (key: string, value: string) => {
    setFormData4({
      ...formData4,
      firstEvent: false,
      [key]: value,
    });
  };

  // Step5
  const [formData5, setFormData5] = useState<any>({
    firstEvent: true,
    paye: "",
  });
  const handleFormChange5 = (key: string, value: string) => {
    setFormData5({
      ...formData5,
      firstEvent: false,
      [key]: value,
    });
  };

  useEffect(() => {
    /* to check where the user should continue in the form */
    const formPageHandler = (data: any) => {
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
        .eq("email", urlEmail)
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
      });

      setFormData3({
        signatureData: data?.[0]?.signatureData ? data?.[0].signatureData : "",
      });

      setFormData4({
        insurance: data?.[0]?.insurance ? data?.[0].insurance : "",
      });

      setFormData5({
        paye: data?.[0]?.paye ? data?.[0].paye : "",
      });

      formPageHandler(data?.[0]);
    };

    /* if existed user */
    if (urlEmail) {
      getPrevData();
    }
  }, [urlEmail]);

  const prevStep = () => {
    if (step == STEP.QUICK_QUOTE) {
      router.push("/");
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
                .eq("email", otherFormData1.email);
            }
            setStep((step) => step + 1);
          }

          if (theEmail) {
            const { error } = await supabase
              .from("claim-form-submissions")
              .update({
                claimValue,
                checkedYears,
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
              .eq("email", theEmail);
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
            const { error } = await supabase
              .from("claim-form-submissions")
              .update({
                claimChecked1: formData2.claimChecked1,
                claimChecked2: formData2.claimChecked2,
                employerName: formData2.employerName?.label,
              })
              .eq("email", theEmail ? theEmail : urlEmail);
            setStep((step) => step + 1);
          }
        }
        break;
      case STEP.SIGN_COMPLETE:
        if (formData3.signatureData !== null) {
          console.log(formData3);
          const { error } = await supabase
            .from("claim-form-submissions")
            .update({ ...formData3 })
            .eq("email", theEmail ? theEmail : urlEmail);
          setStep((step) => step + 1);
        }
        break;
      case STEP.LAST_THING:
        setFormData4({ ...formData4, firstEvent: false });
        if (formData4.insurance !== "" && isNino(formData4.insurance)) {
          const { error } = await supabase
            .from("claim-form-submissions")
            .update({ insurance: formData4.insurance })
            .eq("email", theEmail ? theEmail : urlEmail);
          setStep((step) => step + 1);
        }
        break;
      case STEP.THANK_YOU:
        setFormData5({ ...formData5, firstEvent: false });
        if (formData5.paye !== "" && Utils.validatePAYE(formData5.paye)) {
          const { error } = await supabase
            .from("claim-form-submissions")
            .update({ paye: formData5.paye })
            .eq("email", theEmail ? theEmail : urlEmail);
          setStep((step) => step + 1);
        }
        break;
      case STEP.ALL_DONE:
        router.push("/");
        break;
      default:
        break;
    }
    //
    document.getElementById("btnNext")?.blur();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {

    if (!router.query?.claimValue) {
      router.push("/")
    }


    if (!!router.query?.years || !!router.query?.claimValue) {
      setCheckedYears(
        // @ts-ignore
        Array.isArray(router.query.years)
          ? router.query.years
          : [router.query.years]
      );
      setClaimValue(router.query.claimValue);
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
  }, [router.query]);


  return (
    <Layout>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto lg:flex gap-2">
          <div className="flex items-start mx-auto md:w-[42rem] px-4 md:px-8 xl:px-0">
            <div className="w-full">
              <ProgressBar step={step} prevStep={prevStep} />

              {(step == STEP.LAST_THING || step == STEP.THANK_YOU) && (
                <StepAlert step={step} />
              )}

              <Title step={step} />

              {step == STEP.QUICK_QUOTE && (
                <QuickQuote
                  data={formData1}
                  fdEvents={fdEvents1}
                  handleFormChange={handleFormChange1}
                />
              )}
              {step == STEP.CLAIM_NOW && (
                <ClaimNow
                  data={formData2}
                  handleFormChange={handleFormChange2}
                />
              )}
              {step == STEP.SIGN_COMPLETE && (
                <SignComplete
                  data={formData3}
                  handleFormChange={handleFormChange3}
                />
              )}
              {step == STEP.LAST_THING && (
                <LastThing
                  data={formData4}
                  handleFormChange={handleFormChange4}
                />
              )}
              {step == STEP.THANK_YOU && (
                <ThankYou
                  data={formData5}
                  handleFormChange={handleFormChange5}
                />
              )}
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

          <SidePanel amount={claimValue} step={step} />
        </div>
      </section>

      <ReviewSection />
    </Layout>
  );
}
