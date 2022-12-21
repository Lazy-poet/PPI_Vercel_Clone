import { useState } from "react";

const ThankYou = () => {
  const [paye, setPaye] = useState<string>("");
  const [isBackspacePressed, setIsBackspacePressed] = useState<boolean>(false);

  const onEnterPaye = (value: string) => {
    if (isBackspacePressed) {
      setPaye(value.substring(0, value.length));
      return;
    }

    if (value.length < 3) {
      setPaye(value);
    } else if (value.length == 3) {
      setPaye(value + "/");
    } else if (value.length > 4) {
      setPaye(value);
    }
  };

  const onKeyDown = (type: string) => {
    if (type == "Backspace") {
      setIsBackspacePressed(true);
    } else {
      setIsBackspacePressed(false);
    }
  };

  return (
    <div className="grid gap-5 mt-6 mb-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label
          htmlFor="insurance"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          Your employer&apos;s PAYE number
        </label>
        <div className="flex">
          <span className="inline-flex flex-col justify-center items-center px-4 text-[8px] text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-shield-fill-check text-[#25D0BC] mb-1"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
              />
            </svg>
            SECURE
          </span>
          <input
            type="text"
            name="insurance"
            id="insurance"
            maxLength={9}
            placeholder="123/AB456"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-tr-lg rounded-br-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
            value={paye}
            onChange={(e) => onEnterPaye(e.target.value)}
            onKeyDown={(e) => onKeyDown(e.key)}
          />
        </div>
        <p
          id="helper-text-explanation"
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          Example format: &apos;123/AB456&apos;. You can find your PAYE number
          on letters or emails about PAYE from HMRC, your P60, or your employer
          may provide it on your payslip. It may be called &apos;Employer PAYE
          reference&apos; or &apos;PAYE reference&apos;
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
