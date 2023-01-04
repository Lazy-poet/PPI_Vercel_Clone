import { TAX_TYPE } from "@/libs/constants";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Animated = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const HeroSection = () => {
  const router = useRouter();
  const [firstEvent, setFirstEvent] = useState<boolean>(true);
  const [checked1, setChecked1] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const [checkedYears, setCheckedYears] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(624);
  const [type, setType] = useState<TAX_TYPE>(TAX_TYPE.NONE);

  const toggleCheckedYear = (year: string) => {
    if (checkedYears.includes(year)) {
      setCheckedYears((curr) => curr.filter((val) => val !== year));
    } else {
      setCheckedYears((curr) => [...curr, year]);
    }
  };

  useEffect(() => {
    if (checked1 && checked2) {
      setType(TAX_TYPE.BOTH);
    } else {
      if (checked1) {
        setType(TAX_TYPE.LAST_YEAR);
      } else if (checked2) {
        setType(TAX_TYPE.CURRENT_YEAR);
      } else {
        setType(TAX_TYPE.NONE);
      }
    }
  }, [checked1, checked2]);

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

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 md:px-20 py-8 lg:py-24">
          <div className="grid lg:grid-cols-12 lg:gap-8 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Claim Your&nbsp;
                <span className="text-primary-600 dark:text-primary-500">
                  £
                </span>
                <span className="text-primary-600 dark:text-primary-500">
                  <Animated
                    animateToNumber={amount}
                    configs={[
                      { mass: 1, tension: 220, friction: 90 },
                      { mass: 1, tension: 280, friction: 90 },
                    ]}
                  ></Animated>
                </span>
                &nbsp;Tax Refund Today
              </h1>
              <p className="max-w-2xl mb-10 font-light text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
                Even if you worked from home for just a single day during the pandemic!
              </p>
              <div className={`grid gap-5 sm:grid-cols-2 select-none`}>
                <div
                  className={`checkbox-item flex items-center px-4 rounded border cursor-pointer border-gray-200 dark:border-gray-700 ${firstEvent || checked1 || checked2
                    ? checked1
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
                    checked={checked1}
                    onChange={(e) => {
                      setFirstEvent(false);
                      setChecked1(e.target.checked);
                      toggleCheckedYear("2020-21");
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-checkbox-1"
                    className={`py-4 ml-2 w-full sm:text-lg font-medium cursor-pointer ${firstEvent || checked1 || checked2
                      ? "text-gray-900 dark:text-gray-300"
                      : "text-red-700 dark:text-red-500"
                      }`}
                  >
                    2020 - 21
                  </label>
                </div>
                <div
                  className={`checkbox-item flex items-center px-4 rounded border cursor-pointer border-gray-200 dark:border-gray-700 ${firstEvent || checked1 || checked2
                    ? checked2
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
                    checked={checked2}
                    onChange={(e) => {
                      setFirstEvent(false);
                      setChecked2(e.target.checked);
                      toggleCheckedYear("2021-22");
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-checkbox-2"
                    className={`py-4 ml-2 w-full sm:text-lg font-medium cursor-pointer ${firstEvent || checked1 || checked2
                      ? "text-gray-900 dark:text-gray-300"
                      : "text-red-700 dark:text-red-500"
                      }`}
                  >
                    2021 - 22
                  </label>
                </div>
              </div>
              <p
                className={`max-w-2xl mt-2 mb-10 text-sm ${firstEvent || checked1 || checked2
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
                      <button
                        className="inline-flex justify-between items-center p-5 w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => {
                          setFirstEvent(false);

                          (checked1 || checked2) ? router.push(
                            {
                              pathname: '/claim',
                              query: {
                                ...router.query,
                                amount: amount,
                                years: checkedYears,
                                claimValue: amount,
                              },
                            },
                            '/claim',
                          )
                            : window.scrollTo({ top: 0, behavior: 'smooth' })
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
                      <img
                        className="w-20 mt-4"
                        src="/images/ssl-secure.svg"
                        alt="Secure"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Your information is 100% safe and secure on this website
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;