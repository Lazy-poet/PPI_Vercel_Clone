import { useEffect, useState, useRef } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSystemValues } from "@/contexts/ValueContext";
import { isValid, parse } from "postcode";

const Address = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const {
    showPulse,
    setShowPulse,
    addressList,
    setAddressList,
    userData: data,
    handleFormChange,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    switch (name) {
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
    if (data && data.postCode) {
      if (!addressList.length) {
        searchAddressByPostcode(data.postCode);
      }
    }
  }, []);

  return (
    <>
      <div className="grid gap-5 my-5 sm:grid-cols-2">
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
                  ? (parse(data.postCode).postcode as string)
                  : data.postCode
              }
              onChange={(e) => handleInputChange(e)}
            />
            <button
              type="button"
              className={`${
                showPulse ? "search-pulse" : ""
              } absolute right-2.5 bottom-2.5 text-white bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-900 dark:hover:bg-slate-950 dark:focus:ring-blue-800`}
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
              Please enter a valid postcode
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
                    Choose from the list of addresses
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
            {!firstEvents.address && !data.address && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Please select your address from the list
              </p>
            )}
          </div>
        ) : null}
        {selectedAddress && (
          <blockquote className=" w-full p-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
            {selectedAddress.split(",").map((address, i) => (
              <p
                key={i}
                className="sm:text-lg leading-relaxed text-gray-900 dark:text-white"
              >
                {address}
              </p>
            ))}
            <p className="sm:text-lg leading-relaxed text-gray-900 dark:text-white">
              {data.postCode}
            </p>
          </blockquote>
        )}
      </div>
    </>
  );
};

export default Address;
