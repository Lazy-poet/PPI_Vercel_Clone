import { useSystemValues, IncomeLevel } from "@/contexts/ValueContext";

export enum Earnings {
  LessThan12500 = "Less than £12,500",
  Between12500And50000 = "£12,500 to £50,000",
  MoreThan50001 = "More than £50,001",
}

const ClaimNow = (props: any) => {
  const { userData, firstEvents, handleFormChange } = useSystemValues();

  return (
    <div className="grid gap-[40px] mt-6 mb-5 sm:grid-cols-2">
      <div className={`form-group sm:col-span-2 `}>
        <label
          htmlFor="employer"
          className={`block mb-2 text-lg font-bold text-gray-900 dark:text-white ${
            firstEvents.incomeLevel
              ? ""
              : userData.incomeLevel
              ? userData.incomeLevel === IncomeLevel.ABR
                ? "text-red-600 dark:text-red-600"
                : "text-green-700 dark:text-green-700"
              : "error"
          }`}
        >
          Income Level
        </label>

        <div className="grid w-50 gap-3 text-gray-500 dark:text-gray-400">
          <RadioInput
            value={IncomeLevel.UPA}
            handleFormChange={handleFormChange}
            earnings={userData.incomeLevel}
            id="bordered-radio-1"
            firstEvent={firstEvents.incomeLevel}
          />
          <RadioInput
            value={IncomeLevel.BR}
            handleFormChange={handleFormChange}
            earnings={userData.incomeLevel}
            id="bordered-radio-2"
            firstEvent={firstEvents.incomeLevel}
          />
          <RadioInput
            value={IncomeLevel.ABR}
            handleFormChange={handleFormChange}
            earnings={userData.incomeLevel}
            id="bordered-radio-3"
            firstEvent={firstEvents.incomeLevel}
          />
        </div>
        <p
          className={`mt-2 text-sm text-gray-500 dark:text-gray-400 ${
            firstEvents.incomeLevel ||
            (!!userData.incomeLevel && userData.incomeLevel !== IncomeLevel.ABR)
              ? ""
              : "error"
          }`}
        >
          {userData.incomeLevel === IncomeLevel.ABR
            ? "Sorry! you're not eligible to claim"
            : "Please select your income level."}
        </p>
      </div>
    </div>
  );
};

const RadioInput: React.FC<{
  handleFormChange: (e: string, val: string) => void;
  value: string;
  earnings: IncomeLevel;
  id: string;
  firstEvent: boolean;
}> = ({ handleFormChange, earnings, value, id, firstEvent }) => {
  return (
    <label
      htmlFor={id}
      className={`radio-wrapper icon-input cursor-pointer flex items-center pl-5 border border-gray-200 rounded-lg dark:border-gray-700 ${
        firstEvent || (earnings && earnings !== value)
          ? ""
          : earnings === value
          ? earnings === IncomeLevel.ABR
            ? "error"
            : "success"
          : "error"
      }`}
    >
      <span className="form-icon"></span>
      <input
        id={id}
        type="radio"
        name="earnings"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        checked={earnings === value}
        onChange={(e) => {
          if (!e.target.checked) return;
          handleFormChange("incomeLevel", value);
        }}
      />
      <span className="py-5 ml-4 w-full sm:text-lg font-medium">{value}</span>
    </label>
  );
};
export default ClaimNow;
