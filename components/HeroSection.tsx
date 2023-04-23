import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSystemValues } from "@/contexts/ValueContext";
import Image from "next/image";
import SslSecure from "./SslSecure";
import HeroImg from "../public/images/hero.png";
import CustomAlert from "./CustomAlert";
import { FormControl, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Animated = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});
const HeroSection: React.FC<{
  handleStart: () => void;
}> = ({ handleStart }) => {
  const { userData, setUserData, firstEvents, setFirstEvents } =
    useSystemValues();
  const [Dates, setDates] = useState<string[]>([]);
  const [Months, setMonths] = useState<string[]>([]);
  const [Years, setYears] = useState<string[]>([]);
  const handleMUISelectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    handleFormChange(e.target.name, value);
  };
  useEffect(() => {
    const _dates = [];
    for (let d = 1; d <= 31; d++) {
      _dates.push(("0" + d).slice(-2));
    }
    setDates(_dates);
    //
    const _months = [];
    for (let m = 1; m <= 12; m++) {
      _months.push(("0" + m).slice(-2));
    }
    setMonths(_months);
    //
    const _years = [];
    for (let y = 2005; y >= 1923; y--) {
      _years.push(y.toString());
    }
    setYears(_years);
  }, []);

  const isPageComplete =
    userData.firstName?.length > 1 &&
    userData.lastName?.length > 1 &&
    userData.day &&
    userData.month &&
    userData.year;
  const handleClick = async () => {
    // setFirstEvent(false);
    setFirstEvents({
      ...firstEvents,
      firstName: false,
      lastName: false,
      day: false,
      month: false,
      year: false,
    });

    if (!isPageComplete) {
      return window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    handleStart();
  };
  const handleFormChange = (key: string, value: string) => {
    setUserData({
      ...userData,
      [key]: value,
    });
    if (key === "day" || key === "month" || key === "year") {
      setFirstEvents({
        ...firstEvents,
        day: false,
        month: false,
        year: false,
      });
    } else {
      setFirstEvents({
        ...firstEvents,
        [key]: false,
      });
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    switch (name) {
      case "firstName":
      case "lastName":
        value = value
          .replace(/\s+(\S)/g, "-$1") //replace spaces with '-'
          .replace(/\-+/g, "-") //enforce the occurence of only one consecutive hyphen
          .replace(/[^a-z\-\s]/gi, "")
          .replace(/^\-+/, "");
        value = value.charAt(0).toUpperCase() + value.slice(1);
        break;
    }
    handleFormChange(name, value);
  };
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    value = value.replace(/\-$/g, "").replace(/\s+$/g, "");
    handleFormChange(name, value);
  };
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 md:px-20 py-8 lg:py-24">
          <div className="grid lg:grid-cols-12 lg:gap-8 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl text-4xl font-extrabold leading-none tracking-tight inline md:text-5xl lg:text-6xl dark:text-white">
                Claim Your PPI Tax Refund Today!
              </h1>
              <p className="max-w-2xl mb-8 lg:mb-10 mt-4 font-normal text-gray-500 text-lg lg:text-xl dark:text-gray-400">
                Enter your name and date of birth to check if you qualify.
              </p>
              <div className="grid gap-5 mt-6 mb-5 sm:grid-cols-2">
                <div
                  className={`form-group ${
                    firstEvents.firstName
                      ? ""
                      : userData.firstName.length > 1
                      ? "success"
                      : "error"
                  }`}
                >
                  <label
                    htmlFor="first-name"
                    className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
                  >
                    First name(s)
                  </label>
                  <div className="icon-input">
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white"
                      placeholder="John"
                      required
                      maxLength={64}
                      value={userData.firstName}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
                    />
                    <span className="form-icon"></span>
                  </div>
                  {firstEvents.firstName ? (
                    ""
                  ) : !userData.firstName ? (
                    <p className="mt-2 text-sm">Please enter your first name</p>
                  ) : (
                    userData.firstName.length === 1 && (
                      <p className="mt-2 text-sm">Please enter a valid name</p>
                    )
                  )}
                </div>
                <div
                  className={`form-group ${
                    firstEvents.lastName
                      ? ""
                      : userData.lastName.length > 1
                      ? "success"
                      : "error"
                  }`}
                >
                  <label
                    htmlFor="last-name"
                    className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
                  >
                    Surname
                  </label>
                  <div className="icon-input">
                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white"
                      placeholder=" Doe"
                      required
                      maxLength={64}
                      value={userData.lastName}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
                    />
                    <span className="form-icon"></span>
                  </div>
                  {firstEvents.lastName ? (
                    ""
                  ) : !userData.lastName ? (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      Please enter your surname
                    </p>
                  ) : (
                    userData.lastName.length === 1 && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        Please enter a valid name
                      </p>
                    )
                  )}
                </div>
              </div>
              <div className="form-group w-full my-5">
                <div
                  className={`w-full mb-2 ${
                    firstEvents.day && firstEvents.month && firstEvents.year
                      ? ""
                      : userData.day && userData.month && userData.year
                      ? "success"
                      : "error"
                  }`}
                >
                  <label
                    htmlFor="birthday"
                    className="block text-lg font-bold text-gray-900 dark:text-white"
                  >
                    Date of birth
                  </label>
                </div>

                <div id="birthday" className="grid gap-5 sm:grid-cols-3">
                  <div className="grid gap-5 grid-cols-2 sm:col-span-2">
                    <div
                      className={
                        firstEvents.day
                          ? ""
                          : userData.day
                          ? "success"
                          : "error"
                      }
                    >
                      <div className="icon-input">
                        <FormControl className="w-full mui-select">
                          <Select
                            id="day"
                            name="day"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={userData.day}
                            onChange={(e) => handleMUISelectChange(e)}
                            displayEmpty
                            IconComponent={ExpandMoreIcon}
                          >
                            <MenuItem value="" disabled>
                              DD
                            </MenuItem>
                            {Dates &&
                              Dates.map((item: string, index: number) => (
                                <MenuItem key={index} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                          </Select>
                          <span className="form-icon"></span>
                        </FormControl>
                      </div>
                      {!userData.day && !firstEvents.day && (
                        <p className="mt-2 text-sm">Select day of birth</p>
                      )}
                    </div>
                    <div
                      className={
                        firstEvents.month
                          ? ""
                          : userData.month
                          ? "success"
                          : "error"
                      }
                    >
                      <div className="icon-input">
                        <FormControl className="w-full mui-select">
                          <Select
                            id="month"
                            name="month"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={userData.month}
                            onChange={(e) => handleMUISelectChange(e)}
                            displayEmpty
                            IconComponent={ExpandMoreIcon}
                          >
                            <MenuItem value="" disabled>
                              MM
                            </MenuItem>
                            {Months &&
                              Months.map((item: string, index: number) => (
                                <MenuItem key={index} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                          </Select>
                          <span className="form-icon"></span>
                        </FormControl>
                      </div>
                      {!userData.month && !firstEvents.month && (
                        <p className="mt-2 text-sm">Select month of birth</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      firstEvents.year
                        ? ""
                        : userData.year
                        ? "success"
                        : "error"
                    }
                  >
                    <div className="icon-input">
                      <FormControl className="w-full mui-select">
                        <Select
                          id="year"
                          name="year"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={userData.year}
                          onChange={(e) => handleMUISelectChange(e)}
                          displayEmpty
                          IconComponent={ExpandMoreIcon}
                        >
                          <MenuItem value="" disabled>
                            YYYY
                          </MenuItem>
                          {Years &&
                            Years.map((item: string, index: number) => (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                        </Select>
                        <span className="form-icon"></span>
                      </FormControl>
                    </div>
                    {!userData.year && !firstEvents.year && (
                      <p className="mt-2 text-sm">Select year of birth</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="max-w-2xl text-sm text-gray-500 mt-10">
                <ul className="grid gap-6 w-full md:grid-cols-2">
                  <li className="md:col-span-2">
                    <div className="text-center">
                      <button
                        className="inline-flex justify-between items-center p-5 w-full focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium text-sm rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={handleClick}
                      >
                        <div />
                        <div className="block">
                          <div className="w-full font-semibold text-center text-lg">
                            Check If I Qualify
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
                      <SslSecure />
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
