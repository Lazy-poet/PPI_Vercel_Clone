import { useEffect, useState, MouseEvent } from "react";
import { useSystemValues } from "@/contexts/ValueContext";
import SslSecure from "./SslSecure";
import { FormControl, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Trustpilot from "./Trustpilot";
import InputHelper from "./InputHelper";
import TempDetails from "./TempDetails";
import Image from "next/image";
const HeroSection: React.FC<{
  handleStart: () => void;
}> = ({ handleStart }) => {
  const { ready, userData, setUserData, firstEvents, setFirstEvents } =
    useSystemValues();
  const [Dates, setDates] = useState<string[]>([]);
  const [Months, setMonths] = useState<string[]>([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
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
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      <section className="bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-center leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Claim Your PPI Tax Refund Today!
          </h1>
          <p className="mb-8 lg:mb-10 text-lg font-normal text-gray-500 lg:text-xl text-center sm:px-16 xl:px-24 dark:text-gray-400">
            Discover if you&apos;re eligible for a tax refund in just 60 seconds
            – simply enter your name below to get started!
          </p>
          {!ready && (
            <div className="mt-2 mb-10">
              <Trustpilot />
            </div>
          )}
          <form className="max-w-2xl grid grid-cols-1 gap-5  p-5 mx-auto bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 sm:grid-cols-2">
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
                  placeholder="e.g. Joe"
                  required
                  maxLength={64}
                  value={userData.firstName}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                />
                <span className="form-icon"></span>
              </div>
              {firstEvents.firstName ? (
                ""
              ) : !userData.firstName ? (
                <InputHelper text="Please let us know your first name" error />
              ) : (
                userData.firstName.length === 1 && (
                  <InputHelper text="Please enter a valid name" error />
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
                Last name
              </label>
              <div className="icon-input">
                <input
                  type="text"
                  name="lastName"
                  id="last-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white"
                  placeholder="e.g. Bloggs"
                  required
                  maxLength={64}
                  value={userData.lastName}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                />
                <span className="form-icon"></span>
              </div>
              {firstEvents.lastName ? (
                ""
              ) : !userData.lastName ? (
                <InputHelper text="Please let us know your last name" error />
              ) : (
                userData.lastName.length === 1 && (
                  <InputHelper text="Please enter a valid name" error />
                )
              )}
            </div>
            <div className="form-group w-full sm:col-span-2">
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
                      firstEvents.day ? "" : userData.day ? "success" : "error"
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
                            Day
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
                      <InputHelper text="Select day of birth" error />
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
                            Month
                          </MenuItem>
                          {Months &&
                            Months.map((item: string, index: number) => (
                              <MenuItem
                                key={index}
                                value={("0" + (index + 1)).slice(-2)}
                              >
                                {item}
                              </MenuItem>
                            ))}
                        </Select>
                        <span className="form-icon"></span>
                      </FormControl>
                    </div>
                    {!userData.month && !firstEvents.month && (
                      <InputHelper text="Select month of birth" error />
                    )}
                  </div>
                </div>

                <div
                  className={
                    firstEvents.year ? "" : userData.year ? "success" : "error"
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
                          Year
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
                    <InputHelper text="Select year of birth" error />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full text-sm text-gray-500 mt-5 sm:col-span-2">
              <ul className="grid gap-6 w-full md:grid-cols-2">
                <li className="md:col-span-2">
                  <div className="text-center">
                    <button
                      className="inline-flex justify-between items-center p-5 w-full focus:outline-none text-white bg-[#00A400] hover:bg-[#00A100] focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-[#00A400] dark:hover:bg-[#00A100] dark:focus:ring-green-800"
                      onClick={handleClick}
                    >
                      <div />
                      <div className="block">
                        <div className="w-full font-semibold text-center text-lg">
                          Start Now
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
                    <SslSecure />
                  </div>
                </li>
              </ul>
            </div>
            <TempDetails />
          </form>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-2xl font-medium text-gray-900 dark:text-white">
                &ldquo;If you&apos;ve received a PPI payout since April 2016,
                you may be due a refund on the income tax deducted from the
                interest element of the payout.&rdquo;
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <Image
                src="/images/profile/martin lewis.jpeg"
                className="w-6 h-6 rounded-full"
                width={24}
                height={24}
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 dark:text-white">
                  Martin Lewis
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  Source: ITV News
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
