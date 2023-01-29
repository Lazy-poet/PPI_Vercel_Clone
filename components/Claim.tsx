import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProgressBar from "@/components/ProgressBar";
import { STEP, UserData } from "@/libs/constants";
import Title from "@/components/Title";
import TermsOfService from "@/components/TermsOfService";
import NextButton from "@/components/NextButton";
import SidePanel from "@/components/SidePanel";
import { Earnings } from "@/components/steps/Step1-ClaimNow";
import { NEXT_BUTTON_HELPERS, NEXT_BUTTON_TIMERS } from "@/libs/doms";
import { TAX_YEARS } from "@/components/steps/Step5-Refunds";
import StepAlert from "@/components/StepAlert";
import ClaimLayout from "@/components/Layout";
import Utils from "../libs/utils";
const isNino = require("is-national-insurance-number");
import { postcodeValidator } from "postcode-validator";
import supabase from "utils/client";
import { useSystemValues } from "@/contexts/ValueContext";
import { Worker } from "@react-pdf-viewer/core";
import dynamic from "next/dynamic";
import Spinner from "./Spinner";

const Details = dynamic(() => import("@/components/steps/Step2-Details"), {
  loading: () => <Spinner />,
});
const ClaimNow = dynamic(() => import("@/components/steps/Step1-ClaimNow"), {
  loading: () => <Spinner />,
});

const Signature = dynamic(() => import("@/components/steps/Step3-Signature"), {
  loading: () => <Spinner />,
});

const OneMore = dynamic(() => import("@/components/steps/Step4-OneMore"), {
  loading: () => <Spinner />,
});

const Refunds = dynamic(() => import("@/components/steps/Step5-Refunds"), {
  loading: () => <Spinner />,
});
const AllDone = dynamic(() => import("@/components/steps/Step6-AllDone"), {
  loading: () => <Spinner />,
});

type ClaimProps = {
  setReady: Dispatch<SetStateAction<boolean>>;
  data: UserData[];
};

export const calculateOurFee = (value: number) => {
  let feePercentage = 48;
  return +((value / 100) * feePercentage).toFixed(2);
};
function Claim({ setReady, data }: ClaimProps) {
  const router = useRouter();

  const {
    amount,
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
    setUrlEmail,
    urlEmail,
    urlPhone,
    dbData,
    setDbData,
    newUserEmail,
    setNewUserEmail,
  } = useSystemValues();

  const [step, setStep] = useState<STEP>(STEP.CLAIM_NOW);
  const [open, setOpen] = useState<Boolean>(false);
  const [fileURL, setFileURL] = useState<String>("terms-of-service.pdf");
  const [utmParams, setUtmParams] = useState({});

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

  const base64ToFile = async (base64String: string) =>
    new File(
      [await fetch(base64String).then((res) => res.blob())],
      `${+new Date()}.png`
    );

  const prevStep = () => {
    if (step === STEP.CLAIM_NOW) {
      setReady(false);
    } else {
      setStep((step) => step - 1);
    }
  };

  /**
   * This function updates the PPI_Claim_Form_Completed table with data from the primary table after the user has completed the signature step
   */
  const updateSecondaryTable = async (data: Record<string, any>) => {
    await supabase.from("PPI_Claim_Form_Completed").upsert(
      { ...data, ...(!data.email && { email: newUserEmail ?? urlEmail }) },
      {
        ignoreDuplicates: false,
        onConflict: "email",
      }
    );
  };

  const nextStep = async () => {
    let { day, month, year, ...otherFormData1 } = formData1;

    switch (step) {
      case STEP.CLAIM_NOW:
        setFormData2({ ...formData2, firstEvent: false });
        if (
          formData2.earnings?.length &&
          formData2.earnings !== Earnings.MoreThan150001
        ) {
          const email = newUserEmail ?? urlEmail;
          const valueChanged = formData2.earnings !== dbData.earnings;
          if (email && valueChanged) {
            await supabase
              .from("PPI_Claim_Form")
              .update({
                earnings: formData2.earnings,
              })
              .match({ email: email });
            if (dbData.signatureData) {
              updateSecondaryTable({
                earnings: formData2.earnings,
              });
            }
            setDbData((d) => ({ ...d, earnings: formData2.earnings }));
          }

          setStep(STEP.DETAILS);
        }
        break;
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
        const { firstEvent, ...details } = formData1;
        if (
          Utils.isObjectFilled(details) &&
          postcodeValidator(formData1.postCode, "GB")
        ) {
          const formattedDetails = Utils.formatUserDetails(details);
          if (Utils.hasObjectValueChanged(formattedDetails, dbData)) {
            const diff = Utils.getObjectDifference(dbData, formattedDetails);

            const { data, error } = await supabase
              .from("PPI_Claim_Form")
              .upsert(
                {
                  ...utmParams,
                  claimValue,
                  estimated_total: amount,
                  ourFee: calculateOurFee(+claimValue),
                  earnings: formData2.earnings,
                  link: `https://ppi.claimingmadeeasy.com/?e=${otherFormData1.email}`,
                  email: details.email,
                  ...diff,
                },
                {
                  // upserting with these options creates new entry if email doesn't exist or merge existing fields if it does
                  ignoreDuplicates: false,
                  onConflict: "email",
                }
              )
              .select();

            if (!error) {
              if (urlEmail && "email" in diff) {
                router.push(`/?e=${otherFormData1.email}`, undefined, {
                  shallow: true,
                });
                setUrlEmail(diff.email);
              }
              setDbData((d) => ({ ...(data?.[0] || {}) }));

              if (data?.[0] && dbData.signatureData) {
                updateSecondaryTable({
                  ...data[0],
                });
              }
            }
            setNewUserEmail(data?.[0].email);
          }
          setStep(STEP.SIGNATURE);
        }
        break;

      case STEP.SIGNATURE:
        setFormData3({ ...formData3, firstEvent: false });
        if (formData3.signatureData) {
          if (formData3.signatureData !== dbData.signatureData) {
            const signatureUrlPrefix =
              "https://rzbhbpskzzutuagptiqq.supabase.co/storage/v1/object/public/signatures/";

            const { data: sigData } = await supabase.storage
              .from("signatures")
              .upload(
                `claim-form/${+new Date()}.png`,
                await base64ToFile(formData3.signatureData)
              );

            const { data, error } = await supabase
              .from("PPI_Claim_Form")
              .update({
                signatureData: formData3.signatureData,
                signatureUrl: signatureUrlPrefix + sigData?.path,
              })
              .match(
                urlPhone
                  ? { phone: urlPhone }
                  : { email: newUserEmail ?? urlEmail }
              )
              .select();
            setDbData((d) => ({
              ...d,
              signatureData: formData3.signatureData,
              signatureUrl: signatureUrlPrefix + sigData?.path,
            }));
            if (data?.length) {
              updateSecondaryTable(data[0]);
            }
          }
          setStep(STEP.ONE_MORE);
        }
        break;
      case STEP.ONE_MORE:
        setFormData4({ ...formData4, firstEvent: false });
        if (formData4.insurance && isNino(formData4.insurance)) {
          if (formData4.insurance !== dbData.insurance) {
            const { error } = await supabase
              .from("PPI_Claim_Form")
              .update({ insurance: formData4.insurance })
              .match(
                urlPhone
                  ? { phone: urlPhone }
                  : { email: newUserEmail ?? urlEmail }
              );

            await updateSecondaryTable({ insurance: formData4.insurance });
            setDbData((d) => ({ ...d, insurance: formData4.insurance }));
          }
          setStep(STEP.REFUNDS);
        }
        break;
      case STEP.REFUNDS:
        setFormData5({
          ...formData5,
          firstEvents: Object.keys(TAX_YEARS).reduce((obj, key) => {
            obj[key] = false;
            return obj;
          }, {} as Record<string, boolean>),
        });
        // check if at least one tax year is filled
        const can_proceed = Object.keys(TAX_YEARS).some(
          (key) => !!formData5.tax_years[key]
        );
        if (can_proceed) {
          // default other fields to 0
          const updatedTaxYears = Object.keys(TAX_YEARS).reduce((obj, key) => {
            obj[key] = formData5.tax_years[key] || "0.00";
            return obj;
          }, {} as Record<string, string>);
          const totalTaxYears = Object.keys(TAX_YEARS).reduce(
            (sum, key) => sum + +updatedTaxYears[key],
            0
          );
          setFormData5({ ...formData5, tax_years: updatedTaxYears });
          if (
            Utils.hasObjectValueChanged(updatedTaxYears, dbData.tax_years || {})
          ) {
            const data = {
              ...updatedTaxYears,
              tax_years: updatedTaxYears,
              estimated_total_difference:
                Number(amount.replace(/,/g, "")) - (totalTaxYears ?? 0),
            };
            const { error } = await supabase
              .from("PPI_Claim_Form")
              .update(data)
              .match(
                urlPhone
                  ? { phone: urlPhone }
                  : { email: newUserEmail ?? urlEmail }
              );

            await updateSecondaryTable({ ...data, completed: true });
            setDbData((d) => ({ ...d, tax_years: updatedTaxYears }));
          }
          setStep(STEP.ALL_DONE);
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
    const getPrevData = () => {
      if (!data?.length) {
        return;
      }

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
        earnings: data?.[0]?.earnings || "",
        firstEvent: !data?.[0]?.earnings,
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
        tax_years: Object.keys(TAX_YEARS).reduce((obj, key) => {
          obj[key] = data?.[0]?.tax_years?.[key];
          return obj;
        }, {} as Record<string, string>),
        // if a key in tax_years has been previously filled, set its firstEvent to false and vice-versa

        firstEvents: Object.keys(TAX_YEARS).reduce((obj, key) => {
          obj[key] = !data?.[0]?.tax_years?.[key];
          return obj;
        }, {} as Record<string, boolean>),
      });

      formPageHandler(data?.[0]);
    };

    /* if existed user */
    if (urlEmail || urlPhone) {
      getPrevData();
    }
  }, []);

  useEffect(() => {
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
                  signatureData={formData3}
                  earningsData={formData2}
                  claimValue={claimValue}
                />

                <Title step={step} onClick={handleOpen} />

                {step === STEP.DETAILS && (
                  <Details
                    data={formData1}
                    fdEvents={fdEvents1}
                    handleFormChange={handleFormChange1}
                    handleOpen={handleOpen}
                  />
                )}
                {step === STEP.CLAIM_NOW && (
                  <ClaimNow
                    data={formData2}
                    handleFormChange={handleFormChange2}
                  />
                )}
                {step === STEP.SIGNATURE && (
                  <Signature
                    data={formData3}
                    handleFormChange={handleFormChange3}
                  />
                )}
                {step === STEP.ONE_MORE && (
                  <OneMore
                    data={formData4}
                    handleFormChange={handleFormChange4}
                  />
                )}
                {step === STEP.REFUNDS && (
                  <Refunds
                    data={formData5}
                    handleFormChange={handleFormChange5}
                  />
                )}
                {step === STEP.ALL_DONE && <AllDone />}

                {step !== STEP.ALL_DONE && (
                  <NextButton
                    onClick={nextStep}
                    timer={NEXT_BUTTON_TIMERS[step]}
                    label={step === STEP.REFUNDS ? "Submit" : "Next"}
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
export default Claim;