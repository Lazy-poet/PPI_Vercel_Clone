export enum Earnings {
  LessThan12500 = "Less than £12,500",
  Between12500And50000 = "£12,500 to £50,000",
  MoreThan50001 = "More than £50,001",
}

const ClaimNow = (props: any) => {
  const { data, handleFormChange } = props;

  return (
    <div className="grid gap-[40px] mt-6 mb-5 sm:grid-cols-2">
      <div className={`form-group sm:col-span-2 `}>
        <label
          htmlFor="employer"
          className={`block mb-2 text-lg font-bold text-gray-900 dark:text-white ${
            data.firstEvent
              ? ""
              : data.earnings
              ? data.earnings === Earnings.MoreThan50001
                ? "text-red-600 dark:text-red-600"
                : "text-green-700 dark:text-green-700"
              : "error"
          }`}
        >
          How much do you earn?
        </label>

        <div className="grid w-50 gap-3 text-gray-500 dark:text-gray-400">
          <RadioInput
            value={Earnings.LessThan12500}
            handleFormChange={handleFormChange}
            earnings={data.earnings}
            id="bordered-radio-1"
            firstEvent={data.firstEvent}
          />
          <RadioInput
            value={Earnings.Between12500And50000}
            handleFormChange={handleFormChange}
            earnings={data.earnings}
            id="bordered-radio-2"
            firstEvent={data.firstEvent}
          />
          <RadioInput
            value={Earnings.MoreThan50001}
            handleFormChange={handleFormChange}
            earnings={data.earnings}
            id="bordered-radio-3"
            firstEvent={data.firstEvent}
          />
        </div>
        <p
          className={`mt-2 text-sm text-gray-500 dark:text-gray-400 ${
            data.firstEvent ||
            (!!data.earnings && data.earnings !== Earnings.MoreThan50001)
              ? ""
              : "error"
          }`}
        >
          {data.earnings === Earnings.MoreThan50001
            ? "Sorry! you're not eligible to claim"
            : " Please select your annual income"}
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
          ? earnings === Earnings.MoreThan50001
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
