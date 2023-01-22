import { useEffect, useState, useRef } from "react";
import Utils from "../../libs/utils";
import { postcodeValidator } from "postcode-validator";
import { FormControl, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSystemValues } from "@/contexts/ValueContext";

const Details = (props: any) => {
  const { data, fdEvents, handleFormChange } = props;
  const [Dates, setDates] = useState<string[]>([]);
  const [Months, setMonths] = useState<string[]>([]);
  const [Years, setYears] = useState<string[]>([]);
  const { showPulse, setShowPulse, addressList, setAddressList } =
    useSystemValues();

  // keep track of postcode whose address is currently being shown so we don't refetch unneccessarily
  const currentAddressListPostCode = useRef<string>(data.postCode || "");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    switch (name) {
      case "firstName":
        value = value.charAt(0).toUpperCase() + value.slice(1);
        break;
      case "lastName":
        value = value.charAt(0).toUpperCase() + value.slice(1);
        break;
      case "email":
        value = value.trim();
        break;
      case "postCode":
        value = value.toUpperCase().trim().substr(0, 8);
        if (
          name === "postCode" &&
          value !== currentAddressListPostCode.current
        ) {
          const show = !!value && !!postcodeValidator(value, "GB");
          setShowPulse(show);
        }
        break;
    }
    handleFormChange(name, value);
  };

  const handleMUISelectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    handleFormChange(e.target.name, value);
  };

  const searchAddressByPostcode = (e: string) => {
    if (!e || !postcodeValidator(e, "GB")) {
      return;
    }
    const endpoint = `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?api_key=ak_ku4e95aqGky1uIIQZMefHVykARiTn&q=${e}`;

    fetch(endpoint, { method: "GET", redirect: "follow" })
      .then((response) => response.json())
      .then((res) => {
        if (res.result && res.result.hits) {
          setAddressList(res.result.hits);
          currentAddressListPostCode.current = e;
        } else {
          setAddressList([]);
        }
      })
      .catch((error) => console.log("error", error));
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
    for (let y = 2005; y >= 1950; y--) {
      _years.push(y.toString());
    }
    setYears(_years);

    if (data && data.postCode) {
      if (!addressList.length) {
        searchAddressByPostcode(data.postCode);
      }
    }
  }, []);

  return (
    <>
      <div className="grid gap-5 mt-6 mb-5 sm:grid-cols-2">
        <div
          className={`form-group ${
            fdEvents.firstName ? "" : data.firstName ? "success" : "error"
          }`}
        >
          <label
            htmlFor="first-name"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <div className="icon-input">
            <input
              type="text"
              name="firstName"
              id="first-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white"
              placeholder="First Name"
              required
              maxLength={64}
              value={data.firstName}
              onChange={(e) => handleInputChange(e)}
            />
            <span className="form-icon"></span>
          </div>
          {fdEvents.firstName
            ? ""
            : !data.firstName && (
                <p className="mt-2 text-sm">Type Your First Name</p>
              )}
        </div>
        <div
          className={`form-group ${
            fdEvents.lastName ? "" : data.lastName ? "success" : "error"
          }`}
        >
          <label
            htmlFor="last-name"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <div className="icon-input">
            <input
              type="text"
              name="lastName"
              id="last-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white"
              placeholder="Last Name"
              required
              maxLength={64}
              value={data.lastName}
              onChange={(e) => handleInputChange(e)}
            />
            <span className="form-icon"></span>
          </div>
          {fdEvents.lastName
            ? ""
            : !data.lastName && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Type Your Last Name
                </p>
              )}
        </div>
        <div
          className={`form-group sm:col-span-2 ${
            fdEvents.email
              ? ""
              : data.email && Utils.validateEmail(data.email)
              ? "success"
              : "error"
          }`}
        >
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Email Address
          </label>
          <div className="flex">
            <span className="inline-flex flex-col justify-center items-center px-4 text-[8px] text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                className="bi bi-shield-fill-check text-[#25D0BC] mb-1 fill-green-700 dark:fill-green-600"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
                />
              </svg>
              SECURE
            </span>
            <div className="icon-input w-full">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-tr-lg rounded-br-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white"
                required
                maxLength={64}
                value={data.email}
                onChange={(e) => handleInputChange(e)}
              />
              <span className="form-icon"></span>
            </div>
          </div>
          {fdEvents.email ? (
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              We need your email to keep you updated on your claim
            </p>
          ) : !data.email ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              We need your email to keep you updated on your claim
            </p>
          ) : !Utils.validateEmail(data.email) ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Please provide a valid Email Address
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              We need your email to keep you updated on your claim
            </p>
          )}
        </div>
        <div
          className={`form-group sm:col-span-2 ${
            fdEvents.postCode
              ? ""
              : addressList.length > 0 &&
                data.postCode &&
                postcodeValidator(data.postCode, "GB")
              ? "success"
              : "error"
          }`}
        >
          <label
            htmlFor="address"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Postcode
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="postCode"
              name="postCode"
              className=" block w-full p-4 pl-10 sm:text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Postcode"
              required
              value={data.postCode}
              onChange={(e) => handleInputChange(e)}
            />
            <button
              type="button"
              className={`${
                showPulse ? "search-pulse" : ""
              } text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg sm:text-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              onClick={() => {
                if (showPulse) {
                  // pulse should disappear after addresses have been fetched
                  setShowPulse(false);
                }
                searchAddressByPostcode(data.postCode);
              }}
            >
              Search
            </button>
          </div>
          {fdEvents.postCode ? (
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Enter your postcode, then click &apos;Search&apos; to find your
              address
            </p>
          ) : !(data.postCode && postcodeValidator(data.postCode, "GB")) ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Please provide a valid UK postcode
            </p>
          ) : addressList.length === 0 ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Click &apos;Search&apos; to find your address
            </p>
          ) : (
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Enter your postcode, then click &apos;Search&apos; to find your
              address
            </p>
          )}
        </div>
        {addressList?.length > 0 ? (
          <div
            className={`form-group max-w-full sm:col-span-2 ${
              fdEvents.address ? "" : data.address ? "success" : "error"
            }`}
          >
            <label
              htmlFor="address"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <div className="icon-input">
              <FormControl className="w-full mui-select">
                <Select
                  id="address"
                  name="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={data.address}
                  onChange={(e) => handleMUISelectChange(e)}
                  displayEmpty
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem value="" disabled>
                    Please Select Your Address
                  </MenuItem>
                  {addressList.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={`${item.suggestion.split(
                        ", " +
                          item.suggestion.split(", ")[
                            item.suggestion.split(", ").length - 1
                          ]
                      )}`}
                    >
                      {item.suggestion.split(
                        ", " +
                          item.suggestion.split(", ")[
                            item.suggestion.split(", ").length - 1
                          ]
                      )}
                    </MenuItem>
                  ))}
                </Select>
                <span className="form-icon"></span>
              </FormControl>
            </div>
          </div>
        ) : null}
      </div>

      <div className="form-group w-full my-5">
        <div
          className={`w-full mb-2 ${
            fdEvents.day && fdEvents.month && fdEvents.year
              ? ""
              : data.day && data.month && data.year
              ? "success"
              : "error"
          }`}
        >
          <label
            htmlFor="birthday"
            className="block text-lg font-medium text-gray-900 dark:text-white"
          >
            Date of Birth
          </label>
        </div>

        <div id="birthday" className="grid gap-5 sm:grid-cols-3">
          <div className="grid gap-5 grid-cols-2 sm:col-span-2">
            <div className={fdEvents.day ? "" : data.day ? "success" : "error"}>
              <div className="icon-input">
                <FormControl className="w-full mui-select">
                  <Select
                    id="day"
                    name="day"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={data.day}
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
              {fdEvents.day ? (
                <p
                  id="helper-text-explanation"
                  className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  Day of birth
                </p>
              ) : !data.day ? (
                <p className="mt-2 text-sm">Select the Day of birth</p>
              ) : (
                <p
                  id="helper-text-explanation"
                  className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  Day of birth
                </p>
              )}
            </div>
            <div
              className={fdEvents.month ? "" : data.month ? "success" : "error"}
            >
              <div className="icon-input">
                <FormControl className="w-full mui-select">
                  <Select
                    id="month"
                    name="month"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={data.month}
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
              {fdEvents.month ? (
                <p
                  id="helper-text-explanation"
                  className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  Month of birth
                </p>
              ) : !data.month ? (
                <p className="mt-2 text-sm">Select the Month of birth</p>
              ) : (
                <p
                  id="helper-text-explanation"
                  className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  Month of birth
                </p>
              )}
            </div>
          </div>
          <div className={fdEvents.year ? "" : data.year ? "success" : "error"}>
            <div className="icon-input">
              <FormControl className="w-full mui-select">
                <Select
                  id="year"
                  name="year"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={data.year}
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
            {fdEvents.year ? (
              <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                Year of birth
              </p>
            ) : !data.year ? (
              <p className="mt-2 text-sm">Select the Year of birth</p>
            ) : (
              <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                Year of birth
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;