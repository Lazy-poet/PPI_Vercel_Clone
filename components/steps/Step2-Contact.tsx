import { useEffect, useState, useRef } from "react";
import Utils from "../../libs/utils";
import { FormControl, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSystemValues } from "@/contexts/ValueContext";
import { isValid, parse } from "postcode";
const Details = (props: any) => {
  const { handleOpen } = props;
  const [Dates, setDates] = useState<string[]>([]);
  const [Months, setMonths] = useState<string[]>([]);
  const [Years, setYears] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const {
    showPulse,
    setShowPulse,
    addressList,
    setAddressList,
    setUserData,
    userData: data,
    setFirstEvents,
    firstEvents,
  } = useSystemValues();

  // keep track of postcode whose address is currently being shown so we don't refetch unneccessarily
  const currentAddressListPostCode = useRef<string>(
    parse(data.postCode)?.postcode || ""
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    currentAddressListPostCode.current = data.postCode;
    if (data.postCode && isValid(data.postCode) && !data.address) {
      setShowPulse(true);
    }
  }, []);

  useEffect(() => {
    setSelectedAddress(data.address);
  }, [data.address]);

  const isAddressValid = addressList.some(
    (addr) =>
      data.address ===
      addr.suggestion.substr(0, addr.suggestion.lastIndexOf(","))
  );

  const handleFormChange = (key: string, value: string) => {
    setUserData({
      ...data,
      [key]: value,
    });

    setFirstEvents({
      ...firstEvents,
      [key]: false,
    });
  };
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    value = value.replace(/\-$/g, "").replace(/\s+$/g, "");
    handleFormChange(name, value);
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
      case "email":
        value = value.trim();
        break;
      case "phone":
        // if (value.length < 2) return;
        // if (!value.startsWith("0")) {
        //   value = "07" + value;
        // }

        value = value.substr(0, 11).replace(/\D/g, "");
        break;
      case "postCode":
        value = value.toUpperCase().substr(0, 8).replace(".", "");
        if (isValid(value.trim())) {
          value = parse(value.trim()).postcode!;
        }
        if (
          name === "postCode" &&
          value !== currentAddressListPostCode.current
        ) {
          const show = !!value && !!isValid(value);
          setShowPulse(show);
        }
        break;
    }
    handleFormChange(name, value);
  };
  /**
   * stop pulsing when address has been selected
   */
  useEffect(() => {
    if (data.address && data.postCode === currentAddressListPostCode.current) {
      setShowPulse(false);
    }
  }, [data.address]);

  const handleMUISelectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    handleFormChange(e.target.name, value);
  };

  /**
   * discard the prefilled address if it is invalid
   */
  useEffect(() => {
    if (data.address && addressList.length && !isAddressValid) {
      handleFormChange("address", "");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.address, isAddressValid, addressList]);
  const searchAddressByPostcode = (e: string) => {
    if (!e || !isValid(e)) {
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
const isPhoneValid = data.phone.length === 11 && data.phone.startsWith("07");
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
          className={`form-group sm:col-span-2 ${
            firstEvents.phone ? "" : isPhoneValid ? "success" : "error"
          }`}
        >
          <label
            htmlFor="phone"
            className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
          >
            Mobile Number
          </label>
          <div className="flex">
            <div className="icon-input w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 ${
                    !(firstEvents.phone || isPhoneValid) && "error"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H5.153C5.38971 2.00011 5.6187 2.08418 5.79924 2.23726C5.97979 2.39034 6.10018 2.6025 6.139 2.836L6.879 7.271C6.91436 7.48222 6.88097 7.69921 6.78376 7.89003C6.68655 8.08085 6.53065 8.23543 6.339 8.331L4.791 9.104C5.34611 10.4797 6.17283 11.7293 7.22178 12.7782C8.27072 13.8272 9.52035 14.6539 10.896 15.209L11.67 13.661C11.7655 13.4695 11.9199 13.3138 12.1106 13.2166C12.3012 13.1194 12.5179 13.0859 12.729 13.121L17.164 13.861C17.3975 13.8998 17.6097 14.0202 17.7627 14.2008C17.9158 14.3813 17.9999 14.6103 18 14.847V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H15C7.82 18 2 12.18 2 5V3Z" />
                </svg>
              </div>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="07123 456789"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white"
                required
                maxLength={64}
                value={data.phone}
                onChange={(e) => handleInputChange(e)}
              />
              <span className="form-icon"></span>
            </div>
          </div>
          {firstEvents.phone || isPhoneValid ? (
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              We need this so we can keep you updated on your claim with text
              messages
            </p>
          ) : (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Please enter a valid mobile number.
            </p>
          )}
        </div>
        <div
          className={`form-group sm:col-span-2 ${
            firstEvents.email
              ? ""
              : data.email && Utils.validateEmail(data.email)
              ? "success"
              : "error"
          }`}
        >
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
          >
            Email Address
          </label>
          <div className="flex">
            <div className="icon-input w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 ${
                    !(firstEvents.email || Utils.validateEmail(data.email)) &&
                    "error"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="john.doe@example.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white"
                required
                maxLength={64}
                value={data.email}
                onChange={(e) => handleInputChange(e)}
              />
              <span className="form-icon"></span>
            </div>
          </div>
          {firstEvents.email || Utils.validateEmail(data.email) ? (
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              We’ll never share your details in accordance with our{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpen("privacy-policy.pdf");
                }}
              >
                Privacy Policy
              </a>
              .
            </p>
          ) : (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Please enter a valid email address.
            </p>
          )}
        </div>
        {/* 
        <div
          className={`form-group sm:col-span-2 ${
            firstEvents.postCode
              ? ""
              : addressList.length > 0 &&
                data.postCode &&
                isValid(data.postCode)
              ? "success"
              : "error"
          }`}
        >
          <label
            htmlFor="postCode"
            className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
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
              type="text"
              id="postCode"
              name="postCode"
              className=" block w-full p-4 pl-10 sm:text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g. CH5 3UZ"
              required
              value={
                isValid(data.postCode)
                  ? parse(data.postCode).postcode
                  : data.postCode
              }
              onChange={(e) => handleInputChange(e)}
            />
            <button
              type="button"
              className={`${
                showPulse ? "search-pulse" : ""
              } absolute right-2.5 bottom-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              onClick={() => {
                searchAddressByPostcode(data.postCode);
                if (showPulse) {
                  // pulse should disappear after addresses have been fetched
                  setShowPulse(false);
                }
              }}
            >
              Find My Address
            </button>
          </div>
          {firstEvents.postCode ? (
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Enter your current postcode and click &lsquo;Find My
              Address&rsquo;
            </p>
          ) : !(data.postCode && isValid(data.postCode)) ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Please provide a valid UK postcode
            </p>
          ) : addressList.length === 0 ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Click the button to find your address
            </p>
          ) : (
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Enter your current postcode and click &ldquo;Find My
              Address&rdquo;
            </p>
          )}
        </div>
        {addressList?.length > 0 ? (
          <div
            className={`form-group max-w-full sm:col-span-2 ${
              firstEvents.address ? "" : isAddressValid ? "success" : "error"
            }`}
          >
            <label
              htmlFor="address"
              className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
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
                    Please select your address
                  </MenuItem>
                  {addressList.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={item.suggestion.substr(
                        0,
                        item.suggestion.lastIndexOf(",")
                      )}
                    >
                      {item.suggestion.substr(
                        0,
                        item.suggestion.lastIndexOf(",")
                      )}
                    </MenuItem>
                  ))}
                </Select>
                <span className="form-icon"></span>
              </FormControl>
            </div>
          </div>
        ) : null}
        {selectedAddress && (
          <blockquote className=" w-full p-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
            {selectedAddress.split(",").map((address, i) => (
              <p
                key={i}
                className="sm:text-lg italic leading-relaxed text-gray-900 dark:text-white"
              >
                {address}
              </p>
            ))}
            <p className="sm:text-lg italic leading-relaxed text-gray-900 dark:text-white">
              {data.postCode}
            </p>
          </blockquote>
        )} */}
      </div>
    </>
  );
};

export default Details;
