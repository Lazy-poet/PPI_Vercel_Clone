import Utils from "../../libs/utils";
import { useSystemValues } from "@/contexts/ValueContext";
import Address from "./Address";
import InputHelper from "../InputHelper";
import { useEffect } from "react";

const Details = () => {
  const {
    userData: data,
    firstEvents,
    handleFormChange,
    openPdf,
    titleRef,
  } = useSystemValues();

  useEffect(() => {
    const ref = titleRef.current;
    if (ref) {
      setTimeout(() => titleRef.current?.classList.add("flash"), 0);
    }
    return () => ref?.classList.remove("flash");
  }, [titleRef]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    switch (name) {
      case "email":
        value = value.trim();
        break;
      case "phone":
        value = value.substr(0, 11).replace(/\D/g, "");
        break;
    }
    handleFormChange(name, value);
  };
  const isPhoneValid = data.phone.length === 11 && data.phone.startsWith("07");

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
            Mobile Telephone Number
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
            <InputHelper text="We need this so we can keep you updated on your claim by sms" />
          ) : (
            <InputHelper text=" Please enter a valid mobile number." error />
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
                placeholder="e.g. john.doe@example.com"
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
            <InputHelper>
              We need this so we can keep you updated on your claim by email
            </InputHelper>
          ) : (
            <InputHelper text="Please enter a valid email address." error />
          )}
        </div>
      </div>
      <Address />
    </>
  );
};

export default Details;
