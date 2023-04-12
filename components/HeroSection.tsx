import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import supabase from "utils/client";
import { useSystemValues } from "@/contexts/ValueContext";
import Image from "next/image";
import SslImg from "../public/images/ssl-secure.svg";
import HeroImg from "../public/images/hero.png";
import CustomCurrencyField from "./CustomCurrencyField";
import { UserData } from "@/libs/constants";
import { calculateOurFee } from "./Claim";
import CustomAlert from "./CustomAlert";

const Animated = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});
const HeroSection: React.FC<{
  handleStart: () => void;
}> = ({ handleStart }) => {
  const {
    amount,
    setAmount,
    claimValue,
    setClaimValue,
    linkCode,
    dbData,
    setDbData,
    userEmail,
    userPhone,
  } = useSystemValues();

  const [firstEvent, setFirstEvent] = useState<boolean>(true);

  const calculateClaimFromAmount = (value: string) => {
    value = value.replace(/,/g, "");
    const claim = Math.round(Number(value) * 0.112);
    setClaimValue(claim);
  };

  const handleClick = async () => {
    setFirstEvent(false);
    if (!amount || Number(amount) < 100) {
      return window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (linkCode) {
      const data = {
        estimated_total: amount,
        estimated_total_difference: 0,
      };
      try {
        if (dbData.tax_years) {
          const totalTaxYears = Object.keys(dbData.tax_years).reduce(
            (sum, key) => sum + Number(dbData.tax_years[key].replace(/,/g, "")),
            0
          );
          const estimated_total_difference = Math.max(
            totalTaxYears,
            Number(amount.replace(/,/g, ""))
          );
          data["estimated_total_difference"] = estimated_total_difference;
        }
        const { data: existing_data, error } = await supabase
          .from("PPI_Claim_Form")
          .update(data)
          .match(userEmail ? { email: userEmail } : { link_code: linkCode })
          .select();
        if (!error) {
          setDbData((d: UserData) => ({ ...d, ...data }));
          if (dbData.signatureData || dbData.insurance) {
            const { createdAt, ...rec } = existing_data?.[0];
            await supabase.from("PPI_Claim_Form_Completed").upsert(
              {
                ...rec,
                link_code: linkCode,
              },
              {
                ignoreDuplicates: false,
                onConflict: userEmail ? "email" : "link_code",
              }
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    handleStart();
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 md:px-20 py-8 lg:py-24">
          <div className="grid lg:grid-cols-12 lg:gap-8 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl text-4xl font-extrabold leading-none tracking-tight inline md:text-5xl lg:text-6xl dark:text-white">
                {/* <span className="anim-circle align-top inline-flex gap-1 items-center justify-center">
                  <span className="text-blue-600 font-bold text-2xl md:text-3xl xl:text-4xl ">
                  £
                  </span>
                  <span className="text-blue-600 font-extrabold">
                    <Animated
                      animateToNumber={amount ? claimValue : 200}
                      configs={[
                        { mass: 1, tension: 220, friction: 90 },
                        { mass: 1, tension: 280, friction: 90 },
                      ]}
                      ></Animated>
                      </span>
                </span> */}
                {/* <sup>*</sup> */}
                Claim your PPI tax refund today!
              </h1>
              <p className="max-w-2xl mb-8 lg:mb-10 mt-4 font-normal text-gray-500 text-lg lg:text-xl dark:text-gray-400">
                Finally! now you can get back the money you&apos;re owed without any
                paperwork. But you must act now if you don&apos;t want to miss out
              </p>
              <div className="max-w-2xl ">
                <CustomCurrencyField
                  value={amount}
                  id="grand-total"
                  label="How much PPI did you get back?"
                  placeholder="Enter Total Amount"
                  errorClass={`${
                    Number(amount?.replace(/,/g, "")) >= 100
                      ? "success"
                      : firstEvent
                      ? ""
                      : "error"
                  }`}
                  helperText={
                    firstEvent
                      ? ""
                      : Number(amount?.replace(/,/g, "")) < 100
                      ? "Please enter at least 3 characters"
                      : ""
                  }
                  helperClass={`${
                    Number(amount?.replace(/,/g, "")) >= 100 || firstEvent
                      ? ""
                      : "error"
                  }`}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFirstEvent(false);
                    setAmount(e.target.value);
                    calculateClaimFromAmount(e.target.value);
                  }}
                />
              </div>
              <div className="max-w-2xl text-sm text-gray-500 mt-10">
                <ul className="grid gap-6 w-full md:grid-cols-2">
                  <li className="md:col-span-2">
                    <div className="text-center">
                      <button
                        className="inline-flex justify-between items-center p-5 w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={handleClick}
                      >
                        <div />
                        <div className="block">
                          <div className="w-full font-semibold text-center text-lg">
                            Get Started
                          </div>
                          <div className="w-full flex flex-row justify-center items-center">
                            <div className="flex justify-center items-center space-x-2 ">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M5.11409 6H8V8H2V1.99121H4V4.25645C6.23708 1.91056 8.78663 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12H3C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C9.15922 3 7.04466 3.79137 5.11409 6ZM13 11H17V13H11V6H13V11Z"
                                />
                              </svg>
                              <span>It only takes a minute!</span>
                            </div>
                          </div>
                        </div>
                        <svg
                          aria-hidden="true"
                          className="ml-3 w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <CustomAlert
                        body="<strong>30,000+ people</strong> started their claim with us in the last 30 days"
                        color="blue"
                        closable={false}
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-5 text-left ">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="float-left mr-1 mb-0"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 9V7C5 5.67392 5.52678 4.40215 6.46447 3.46447C7.40215 2.52678 8.67392 2 10 2C11.3261 2 12.5979 2.52678 13.5355 3.46447C14.4732 4.40215 15 5.67392 15 7V9C15.5304 9 16.0391 9.21071 16.4142 9.58579C16.7893 9.96086 17 10.4696 17 11V16C17 16.5304 16.7893 17.0391 16.4142 17.4142C16.0391 17.7893 15.5304 18 15 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V11C3 10.4696 3.21071 9.96086 3.58579 9.58579C3.96086 9.21071 4.46957 9 5 9ZM13 7V9H7V7C7 6.20435 7.31607 5.44129 7.87868 4.87868C8.44129 4.31607 9.20435 4 10 4C10.7956 4 11.5587 4.31607 12.1213 4.87868C12.6839 5.44129 13 6.20435 13 7Z"
                            fill="#111928"
                          />
                        </svg>

                        <span>
                          This form is securely encrypted to ensure your data is
                          safe
                        </span>
                      </p>
                      <Image
                        className="w-20 md:w-24 mt-4"
                        src={SslImg}
                        alt="Secure"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <Image
                className="object-cover"
                src={HeroImg}
                alt="mockup"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
