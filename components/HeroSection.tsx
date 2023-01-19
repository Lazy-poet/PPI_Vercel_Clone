import { TAX_TYPE } from "@/libs/constants";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import supabase from "utils/client";
import { useSystemValues } from "@/contexts/ValueContext";
import Image from "next/image";
import SslImg from "../public/images/ssl-secure.svg";
import HeroImg from "../public/images/hero.png";

const Animated = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});
const HeroSection: React.FC<{
  handleStart: () => void;
  setClaimValue: Dispatch<SetStateAction<number>>;
}> = ({ handleStart, setClaimValue }) => {
  const router = useRouter();
  const { amount, setAmount, checkedYears, setCheckedYears } =
    useSystemValues();

  const fromEmail = router.query.email;
  const [firstEvent, setFirstEvent] = useState<boolean>(true);
  const [checkedFirstBox, setCheckedFirstBox] = useState<boolean>(false);
  const [checkedSecondBox, setCheckedSecondBox] = useState<boolean>(false);
  const [type, setType] = useState<TAX_TYPE>(TAX_TYPE.NONE);

  const toggleCheckedYear = (year: string) => {
    if (checkedYears.includes(year)) {
      const years = checkedYears.filter((val) => val !== year);
      setCheckedYears(years);
    } else {
      setCheckedYears([...checkedYears, year]);
    }
  };

  useEffect(() => {
    const getPrevData = async () => {
      const { data, error } = await supabase
        .from("claim-form-submissions")
        .select("checkedYears")
        .eq("email", fromEmail);

      if (data?.[0]?.checkedYears.includes("2020-21")) {
        setCheckedYears(["2020-21"]);
        setCheckedFirstBox(true);
      }

      if (data?.[0]?.checkedYears.includes("2021-22")) {
        setCheckedYears(["2021-22"]);
        setCheckedSecondBox(true);
      }

      if (
        data?.[0]?.checkedYears.includes("2020-21") &&
        data?.[0]?.checkedYears.includes("2021-22")
      ) {
        setCheckedYears(["2020-21", "2021-22"]);
        setCheckedSecondBox(true);
      }
    };

    getPrevData();
  }, [fromEmail]);

  useEffect(() => {
    if (checkedFirstBox && checkedSecondBox) {
      setType(TAX_TYPE.BOTH);
    } else {
      if (checkedFirstBox) {
        setType(TAX_TYPE.LAST_YEAR);
      } else if (checkedSecondBox) {
        setType(TAX_TYPE.CURRENT_YEAR);
      } else {
        setType(TAX_TYPE.NONE);
      }
    }
  }, [checkedFirstBox, checkedSecondBox]);

  useEffect(() => {
    switch (type) {
      case TAX_TYPE.NONE:
        setAmount(624);
        break;
      case TAX_TYPE.CURRENT_YEAR:
      case TAX_TYPE.LAST_YEAR:
        setAmount(312);
        break;
      case TAX_TYPE.BOTH:
        setAmount(624);
        break;
    }
  }, [type]);

  useEffect(() => {
    setClaimValue(amount);
  }, [amount]);

  useEffect(() => {
    if (checkedYears.includes("2020-21")) {
      setCheckedFirstBox(true);
    }
    if (checkedYears.includes("2021-22")) {
      setCheckedSecondBox(true);
    }
  }, []);

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 md:px-20 py-8 lg:py-24">
          <div className="grid lg:grid-cols-12 lg:gap-8 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Claim Your&nbsp;
                <span className="anim-circle align-top inline-flex gap-1 items-center justify-center">
                  <span className="text-blue-500 font-bold text-2xl md:text-3xl xl:text-4xl ">
                    £
                  </span>
                  <span className="text-blue-500 font-extrabold">
                    <Animated
                      animateToNumber={amount}
                      configs={[
                        { mass: 1, tension: 220, friction: 90 },
                        { mass: 1, tension: 280, friction: 90 },
                      ]}
                    ></Animated>
                  </span>
                </span>
                &nbsp;Tax Refund Today
              </h1>
              <p className="max-w-2xl mb-10 font-light text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
                Now you can claim even if you had to work from home for just a
                single day during the pandemic!
              </p>
              <div className={`grid gap-5 sm:grid-cols-2 select-none`}>
                <div
                  className={`checkbox-item flex items-center px-4 rounded border cursor-pointer border-gray-200 dark:border-gray-700 ${
                    firstEvent || checkedFirstBox || checkedSecondBox
                      ? checkedFirstBox
                        ? "success"
                        : ""
                      : "error"
                  }`}
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    checked={checkedFirstBox}
                    onChange={(e) => {
                      setFirstEvent(false);
                      setCheckedFirstBox(e.target.checked);
                      toggleCheckedYear("2020-21");
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-checkbox-1"
                    className={`py-4 ml-2 w-full sm:text-lg font-medium cursor-pointer ${
                      firstEvent || checkedFirstBox || checkedSecondBox
                        ? "text-gray-900 dark:text-gray-300"
                        : "text-red-700 dark:text-red-500"
                    }`}
                  >
                    2020 - 21
                  </label>
                </div>
                <div
                  className={`checkbox-item flex items-center px-4 rounded border cursor-pointer border-gray-200 dark:border-gray-700 ${
                    firstEvent || checkedFirstBox || checkedSecondBox
                      ? checkedSecondBox
                        ? "success"
                        : ""
                      : "error"
                  }`}
                >
                  <input
                    id="bordered-checkbox-2"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    checked={checkedSecondBox}
                    onChange={(e) => {
                      setFirstEvent(false);
                      setCheckedSecondBox(e.target.checked);
                      toggleCheckedYear("2021-22");
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-checkbox-2"
                    className={`py-4 ml-2 w-full sm:text-lg font-medium cursor-pointer ${
                      firstEvent || checkedFirstBox || checkedSecondBox
                        ? "text-gray-900 dark:text-gray-300"
                        : "text-red-700 dark:text-red-500"
                    }`}
                  >
                    2021 - 22
                  </label>
                </div>
              </div>
              <p
                className={`max-w-2xl mt-2 text-sm ${
                  firstEvent || checkedFirstBox || checkedSecondBox
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-red-600 dark:text-red-500"
                }`}
              >
                Select the year(s) you worked from home
              </p>
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
                        onClick={() => {
                          setFirstEvent(false);

                          checkedFirstBox || checkedSecondBox
                            ? handleStart()
                            : window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
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
