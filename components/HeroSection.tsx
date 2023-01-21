import { TAX_TYPE } from "@/libs/constants";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "utils/client";
import { useSystemValues } from "@/contexts/ValueContext";
import Image from "next/image";
import SslImg from "../public/images/ssl-secure.svg";
import HeroImg from "../public/images/hero.png";
import CustomCurrencyField from "./CustomCurrencyField";

const Animated = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});
const HeroSection: React.FC<{
  handleStart: () => void;
}> = ({ handleStart }) => {
  const router = useRouter();
  const {
    amount,
    setAmount,
    checkedYears,
    setCheckedYears,
    claimValue,
    setClaimValue,
  } = useSystemValues();

  const fromEmail = router.query.email;
  const [firstEvent, setFirstEvent] = useState<boolean>(true);
  const [type, setType] = useState<TAX_TYPE>(TAX_TYPE.NONE);

  const toggleCheckedYear = (year: string) => {
    if (checkedYears.includes(year)) {
      const years = checkedYears.filter((val) => val !== year);
      setCheckedYears(years);
    } else {
      setCheckedYears([...checkedYears, year]);
    }
  };

  const calculateClaimFromAmount = (value: string) => {
    value = value.replace(/,/g, "");
    const claim = Math.round(Number(value) * 0.0952);
    setClaimValue(claim);
  };

  const handleClick = async () => {
    setFirstEvent(false);
    if (!claimValue) {
      return window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (fromEmail) {
      try {
        await supabase
          .from("claim-form-submissions")
          .update({ estimated_total: amount })
          .match({ email: fromEmail });
      } catch (e) {
        console.log(e);
      }
    }
    handleStart();
  };

  useEffect(() => {
    if (!fromEmail) return;
    const getPrevAmount = async () => {
      try {
        const { data, error } = await supabase
          .from("claim-form-submissions")
          .select("estimated_total")
          .eq("email", fromEmail);
        if (data?.[0]?.estimated_total) {
          setAmount(data[0].estimated_total);
          calculateClaimFromAmount(data[0].estimated_total);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getPrevAmount();
  }, [fromEmail]);

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 md:px-20 py-8 lg:py-24">
          <div className="grid lg:grid-cols-12 lg:gap-8 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1
                className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight inline bg-[#E5E7EB] pr-3 dark:bg-transparent md:text-5xl xl:text-6xl dark:text-white"
                style={{ lineHeight: 1.3 }}
              >
                Claim Your&nbsp;
                <span className="anim-circle align-top inline-flex gap-1 items-center justify-center">
                  <span className="text-blue-600 font-bold text-2xl md:text-3xl xl:text-4xl ">
                    £
                  </span>
                  <span className="text-blue-600 font-extrabold">
                    <Animated
                      animateToNumber={claimValue || 200}
                      configs={[
                        { mass: 1, tension: 220, friction: 90 },
                        { mass: 1, tension: 280, friction: 90 },
                      ]}
                    ></Animated>
                    <sup>*</sup>
                  </span>
                </span>
                &nbsp;Tax Refund Today
              </h1>
              <p className="max-w-2xl mb-10 font-light text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
                Now you can claim even if you had to work from home for just a
                single day during the pandemic!
              </p>
              <div className="max-w-2xl ">
                <CustomCurrencyField
                  firstEvent={firstEvent}
                  amount={amount}
                  claimValue={claimValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFirstEvent(false);
                    setAmount(e.target.value);
                    calculateClaimFromAmount(e.target.value);
                  }}
                />
              </div>
              <div className="max-w-2xl text-sm text-gray-500">
                <ul className="grid gap-6 w-full md:grid-cols-2">
                  <li className="md:col-span-2">
                    <div>
                      <div className="flex justify-center items-center mt-10 mb-5 space-x-2 text-sm text-gray-500 dark:text-gray-400 pr-9">
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
                      <button
                        className="inline-flex justify-between items-center p-5 w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={handleClick}
                      >
                        <div className="flex-grow">
                          <div className="w-full flex flex-row justify-center items-center text-2xl font-semibold">
                            <span>Get Started</span>
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
                      <Image className="w-20 mt-4" src={SslImg} alt="Secure" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Your information is 100% safe and secure on this website
                      </p>
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
