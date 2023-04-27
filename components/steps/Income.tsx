import { useSystemValues, IncomeLevel } from "@/contexts/ValueContext";

export enum Earnings {
  LessThan12570 = "Less than £12,570",
  Between12571And50270 = "£12,500 to £50,270",
  MoreThan50271 = "More than £50,271",
}

const ClaimNow = () => {
  const { userData, firstEvents, handleFormChange } = useSystemValues();

  return (
    <div className="grid gap-[40px] mt-6 mb-5 sm:grid-cols-2">
      <div className={`form-group sm:col-span-2 `}>
        <label
          htmlFor="employer"
          className={`block mb-2 text-lg font-bold text-gray-900 dark:text-white ${
            firstEvents.earnings
              ? ""
              : userData.earnings
              ? userData.earnings === Earnings.MoreThan50271
                ? "text-red-600 dark:text-red-600"
                : "text-green-700 dark:text-green-700"
              : "error"
          }`}
        >
          How much do you earn?
        </label>

        <div className="grid w-50 gap-5 text-gray-500 dark:text-gray-400">
          <RadioInput
            value={Earnings.LessThan12570}
            handleFormChange={handleFormChange}
            earnings={userData.earnings}
            id="bordered-radio-1"
            firstEvent={firstEvents.earnings}
          />
          <RadioInput
            value={Earnings.Between12571And50270}
            handleFormChange={handleFormChange}
            earnings={userData.earnings}
            id="bordered-radio-2"
            firstEvent={firstEvents.earnings}
          />
          <RadioInput
            value={Earnings.MoreThan50271}
            handleFormChange={handleFormChange}
            earnings={userData.earnings}
            id="bordered-radio-3"
            firstEvent={firstEvents.earnings}
          />
        </div>
        <p
          className={`mt-2 text-sm text-gray-500 dark:text-gray-400 ${
            firstEvents.earnings ||
            (!!userData.earnings &&
              userData.earnings !== Earnings.MoreThan50271)
              ? ""
              : "error"
          }`}
        >
          {userData.earnings === Earnings.MoreThan50271
            ? "Unfortunately, you do not qualify for a PPI tax refund based on your income"
            : "Please select your annual income"}
        </p>
      </div>
    </div>
  );
};

const RadioInput: React.FC<{
  handleFormChange: (e: string, val: string) => void;
  value: string;
  earnings: Earnings;
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
          ? earnings === Earnings.MoreThan50271
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
          handleFormChange("earnings", value);
        }}
      />
      <span className="py-5 ml-4 w-full sm:text-lg font-medium">{value}</span>
    </label>
  );
};
export default ClaimNow;
