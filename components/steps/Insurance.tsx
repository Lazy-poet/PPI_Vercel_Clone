import { useSystemValues } from "@/contexts/ValueContext";
import InputHelper from "../InputHelper";
import OtpInput from "react-otp-input";

const isNino = require("is-national-insurance-number");

const Insurance = () => {
  const { userData, firstEvents, handleFormChange } = useSystemValues();

  const handleInputChange = (value: string) => {
    //accept only letters and numbers
    const regex = new RegExp("^[a-zA-Z0-9]+$");
    if (value.length && !regex.test(value)) {
      return;
    }
    handleFormChange("insurance", value);
  };

  return (
    <div className="grid gap-5 mt-6 mb-5 sm:grid-cols-2">
      <div
        className={`form-group sm:col-span-2 ${
          firstEvents.insurance
            ? ""
            : userData.insurance && isNino(userData.insurance)
            ? "success"
            : "error"
        }`}
      >
        <label
          htmlFor="insurance"
          className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
        >
          National Insurance (NI) number
        </label>
        <div className="flex">
          <div className="icon-input w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                viewBox="0 0 16 18"
                className={`hidden w-5 h-5 text-gray-500 dark:text-gray-400 ${
                  !firstEvents.insurance &&
                  !(userData.insurance && isNino(userData.insurance)) &&
                  "error"
                }`}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.166 3.999C3.06114 3.963 5.84481 2.87746 8 0.944C10.155 2.87782 12.9387 3.96373 15.834 4C15.944 4.65 16 5.32 16 6.001C16 11.226 12.66 15.671 8 17.318C3.34 15.67 0 11.225 0 6C0 5.318 0.0569999 4.65 0.166 3.999ZM11.707 7.707C11.8892 7.5184 11.99 7.2658 11.9877 7.0036C11.9854 6.7414 11.8802 6.49059 11.6948 6.30518C11.5094 6.11977 11.2586 6.0146 10.9964 6.01233C10.7342 6.01005 10.4816 6.11084 10.293 6.293L7 9.586L5.707 8.293C5.5184 8.11084 5.2658 8.01005 5.0036 8.01233C4.7414 8.0146 4.49059 8.11977 4.30518 8.30518C4.11977 8.49059 4.0146 8.7414 4.01233 9.0036C4.01005 9.2658 4.11084 9.5184 4.293 9.707L6.293 11.707C6.48053 11.8945 6.73484 11.9998 7 11.9998C7.26516 11.9998 7.51947 11.8945 7.707 11.707L11.707 7.707Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <OtpInput
              value={userData.insurance}
              onChange={(value) =>
                handleInputChange(value.toUpperCase().trim())
              }
              numInputs={9}
              renderInput={(props, index) => (
                <input
                  {...props}
                  type={index > 1 && index < 8 ? "tel" : "text"}
                />
              )}
              inputStyle="flex-1 !p-1 !h-10 sm:!h-12 !max-w-[48px] sm:p-4 rounded"
              containerStyle="w-full flex flex-wrap gap-1.5  sm:gap-3"
            />
          </div>
        </div>
        {firstEvents.insurance ? (
          <InputHelper
            text="You can find your NI number on your payslip, P60, or any letters
            sent to you by HMRC relating to tax and benefits."
          />
        ) : !userData.insurance || !isNino(userData.insurance) ? (
          <InputHelper
            text="Please provide a valid National Insurance (NI) number"
            error
          />
        ) : (
          <InputHelper
            text=" You can find your NI number on your payslip, P60, or any letters
            sent to you by HMRC relating to tax and benefits."
          />
        )}
      </div>
    </div>
  );
};

export default Insurance;
