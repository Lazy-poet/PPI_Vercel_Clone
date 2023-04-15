import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProgressBar from "@/components/ProgressBar";
import { STEP, UserData } from "@/libs/constants";
import Title from "@/components/Title";
import NextButton from "@/components/NextButton";
import SidePanel from "@/components/SidePanel";
import { Earnings } from "@/components/steps/Step1-ClaimNow";
import { NEXT_BUTTON_HELPERS, NEXT_BUTTON_TIMERS } from "@/libs/doms";
import { TAX_YEARS } from "@/components/steps/Step5-Refunds";
import StepAlert from "@/components/StepAlert";
import Utils from "../libs/utils";
const isNino = require("is-national-insurance-number");
import { isValid, parse } from "postcode";
import supabase from "utils/client";
import { useSystemValues } from "@/contexts/ValueContext";
import dynamic from "next/dynamic";
import Spinner from "./Spinner";
import { nanoid } from "nanoid";

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
    linkCode,
    setLinkCode,
    dbData,
    setDbData,
    userEmail,
    setUserEmail,
    userPhone,
    userIp,
    openPdf,
  } = useSystemValues();

  const [step, setStep] = useState<STEP>(STEP.CLAIM_NOW);

  const [utmParams, setUtmParams] = useState({} as Record<string, string>);

  // Step1

  const handleFormChange1 = (key: string, value: string) => {
    // if (key === "email") {
    //   setUserEmail(value);
    // }
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
  const handleFormChange3 = (key: string, value: string) => {
    setFormData3({
      ...formData3,
      [key]: value,
      ...(key === "signatureData" && { firstEvent: false }),
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
  const updateSecondaryTable = async (record: Record<string, any>) => {
    const { createdAt, id, ...data } = record;
    await supabase.from("PPI_Claim_Form_Completed").upsert(
      {
        ...data,
        ...(userEmail && !data.email && { email: userEmail }),
        ...(userPhone && !data.phone && { phone: userPhone }),
        ...(linkCode &&
          !data.link_code && {
            link_code: linkCode,
            link: `https://ppi.claimingmadeeasy.co.uk/?c=${linkCode}`,
          }),
      },
      {
        ignoreDuplicates: false,
        onConflict: userEmail ? "email" : "link_code",
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
          ![Earnings.MoreThan150001, Earnings.Between50001And150000].includes(
            formData2.earnings as Earnings
          )
        ) {
          const valueChanged = formData2.earnings !== dbData.earnings;
          if ((userEmail || linkCode) && valueChanged) {
            const { data, error } = await supabase
              .from("PPI_Claim_Form")
              .update({
                earnings: formData2.earnings,
              })
              .match(userEmail ? { email: userEmail } : { link_code: linkCode })
              .select();
            if (data?.length && (data[0].signatureData || data[0].insurance)) {
              await updateSecondaryTable({
                ...data[0],
              });
              setDbData(data[0]);
            }
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
          details.firstName.length > 1 &&
          details.lastName.length > 1 &&
          Utils.isObjectFilled(details) &&
          isValid(details.postCode) &&
          Utils.validateEmail(details.email)
        ) {
          const formattedDetails = Utils.formatUserDetails(details);
          if (Utils.hasObjectValueChanged(formattedDetails, dbData)) {
            // if email has changed, copy current data to new row, otherwise only update changed fields
            delete dbData.id;
            const diff =
              details.email === userEmail
                ? Utils.getObjectDifference(dbData, formattedDetails)
                : { ...dbData, ...formattedDetails };
            // set a new link_code either if there isnt an existing one or when user email has changed
            const link_code = linkCode
              ? details.email !== userEmail
                ? nanoid(9)
                : linkCode
              : nanoid(9);

            const { data, error } = await supabase
              .from("PPI_Claim_Form")
              .upsert(
                {
                  ...utmParams,
                  ...diff,
                  estimated_total: amount,
                  ...(!dbData.estimated_total_difference && {
                    estimated_total_difference: Number(
                      amount.replace(/,/g, "")
                    ),
                  }),
                  earnings: formData2.earnings,
                  link_code,
                  link: `https://ppi.claimingmadeeasy.co.uk/?c=${link_code}`,
                  email: details.email,
                  user_ip: userIp,
                },
                {
                  // upserting with these options creates new entry if email doesn't exist or merge existing fields if it does
                  ignoreDuplicates: false,
                  onConflict: "link_code",
                }
              )
              .select();

            if (data?.[0]) {
              setDbData(data[0]);
              if (data[0].signatureData || data[0].insurance) {
                await updateSecondaryTable({
                  ...data[0],
                });
              }
              setUserEmail(details.email);
              setLinkCode(link_code);
            }
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
              .match({ link_code: linkCode })
              .select();
            if (data?.length) {
              setDbData(data[0]);
              await updateSecondaryTable(data[0]);
            }
          }
          setStep(STEP.ONE_MORE);
        }
        break;
      case STEP.ONE_MORE:
        setFormData4({ ...formData4, firstEvent: false });
        if (formData4.insurance && isNino(formData4.insurance)) {
          if (formData4.insurance !== dbData.insurance) {
            const { data } = await supabase
              .from("PPI_Claim_Form")
              .update({ insurance: formData4.insurance })
              .match({ email: userEmail })
              .select();

            if (data?.length) {
              setDbData(data[0]);
              await updateSecondaryTable(data[0]);
            }
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
            (sum, key) => sum + Number(updatedTaxYears[key].replace(/,/g, "")),
            0
          );
          setFormData5({ ...formData5, tax_years: updatedTaxYears });
          if (
            Utils.hasObjectValueChanged(updatedTaxYears, dbData.tax_years || {})
          ) {
            const estimated_total_difference = Math.max(
              totalTaxYears,
              Number(amount.replace(/,/g, ""))
            );

            const tax_data = {
              ...updatedTaxYears,
              tax_years: updatedTaxYears,
              estimated_total_difference,
              completed: true,
            };
            const { data } = await supabase
              .from("PPI_Claim_Form")
              .update(tax_data)
              .match({ link_code: linkCode })
              .select();
            if (data?.[0]) {
              await updateSecondaryTable(data[0]);
              setDbData(data[0]);
            }
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
    /* get existed user data */
    const getPrevData = () => {
      if (!data?.length) {
        return;
      }
      let dob = { day: "", month: "", year: "" };
      if (data?.[0].birthdate) {
        dob =
          typeof data?.[0].birthdate === "string"
            ? JSON.parse(data?.[0]?.birthdate)
            : data?.[0].birthdate;
      } else if (data?.[0].birthdate_str) {
        const separator = data[0].birthdate_str.includes("/")
          ? "/"
          : data[0].birthdate_str.includes("-")
          ? "-"
          : " ";
        const [day, month, year] = data?.[0].birthdate_str.split(separator);
        dob = { day, month, year };
      }

      /* update the form data with existing user data */

      setFormData1({
        firstEvent: true,
        firstName: data?.[0]?.firstName ? data?.[0].firstName : "",
        lastName: data?.[0].lastName ? data?.[0].lastName : "",
        email: data?.[0].email ? data?.[0].email : "",
        postCode: data?.[0].postCode ? parse(data?.[0].postCode).postcode : "",
        address: data?.[0].address ? data?.[0].address : "",
        day: dob.day,
        month: dob.month,
        year: dob.year,
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
    };

    /* if existed user */
    if (linkCode) {
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
        if (key === "s") {
          utmParams["utm_source"] = router.query[key];
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
      isValid(formData1.postCode) &&
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
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto lg:flex">
        <div className="flex items-start mx-auto md:w-[42rem] px-4 md:px-8 xl:px-0">
          <div className="w-full">
            <ProgressBar step={step} goToPrevStep={prevStep} />

            <StepAlert
              step={step}
              signatureData={formData3}
              earningsData={formData2}
              claimValue={claimValue}
            />

            <Title step={step} onClick={openPdf} />

            {step === STEP.DETAILS && (
              <Details
                data={formData1}
                fdEvents={fdEvents1}
                handleFormChange={handleFormChange1}
                handleOpen={openPdf}
              />
            )}
            {step === STEP.CLAIM_NOW && (
              <ClaimNow data={formData2} handleFormChange={handleFormChange2} />
            )}
            {step === STEP.SIGNATURE && (
              <Signature
                data={formData3}
                handleFormChange={handleFormChange3}
              />
            )}
            {step === STEP.ONE_MORE && (
              <OneMore data={formData4} handleFormChange={handleFormChange4} />
            )}
            {step === STEP.REFUNDS && (
              <Refunds data={formData5} handleFormChange={handleFormChange5} />
            )}
            {step === STEP.ALL_DONE && <AllDone />}

            {step !== STEP.ALL_DONE && (
              <NextButton
                onClick={nextStep}
                timer={NEXT_BUTTON_TIMERS[step]}
                label={step === STEP.REFUNDS ? "Submit" : "Next"}
                helper={NEXT_BUTTON_HELPERS(step, openPdf)}
              />
            )}
          </div>
        </div>

        <SidePanel amount={claimValue} step={step} />
      </div>
    </section>
  );
}
export default Claim;
