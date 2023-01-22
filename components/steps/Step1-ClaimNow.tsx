
const ClaimNow = (props: any) => {
  const { data, handleFormChange } = props;

  return (
    <div className="grid gap-[40px] mt-6 mb-5 sm:grid-cols-2">
      <div
        className={`form-group sm:col-span-2 ${
          data.firstEvent || !!data.earnings ? "" : "error"
        }`}
      >
        <label
          htmlFor="employer"
          className={`block mb-2 text-lg font-medium text-gray-900 dark:text-white ${
            data.earnings && "text-green-700 dark:text-green-700"
          }`}
        >
          How much did you earn?
        </label>

        <div className="grid w-50 gap-3 text-gray-500 dark:text-gray-400">
          <RadioInput
            value="Less than £12,500"
            handleFormChange={handleFormChange}
            earnings={data.earnings}
            id="bordered-radio-1"
          />
          <RadioInput
            value="£12,501 to £50,000"
            handleFormChange={handleFormChange}
            earnings={data.earnings}
            id="bordered-radio-2"
          />
          <RadioInput
            value="More than £50,001"
            handleFormChange={handleFormChange}
            earnings={data.earnings}
            id="bordered-radio-3"
          />
        </div>
        <p
          className={`mt-2 text-sm text-gray-500 dark:text-gray-400 ${
            data.firstEvent
              ? ""
              : !!data.earnings
              ? " text-green-700 dark:text-green-700"
              : "error"
          }`}
        >
          Select your annual income
        </p>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="confirm"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          Please confirm the following:
        </label>
        <div className="mb-2">
          <label className="inline-flex relative items-start md:items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              checked={data.claimChecked1}
              className="sr-only peer"
              onChange={(e) =>
                handleFormChange("claimChecked1", e.target.checked)
              }
            />
            <div className="w-14 min-w-[56px] h-7 min-h-[28px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 my-auto">
              I haven&apos;t applied for a PPI tax refund before
            </span>
          </label>
        </div>
        <div>
          <label className="inline-flex relative items-start md:items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              checked={data.claimChecked2}
              className="sr-only peer"
              onChange={(e) =>
                handleFormChange("claimChecked2", e.target.checked)
              }
            />
            <div className="w-14 min-w-[56px] h-7 min-h-[28px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 my-auto">
              I do not submit Self-Assessment Tax Returns
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

const RadioInput: React.FC<{
  handleFormChange: (e: string, val: string) => void;
  value: string;
  earnings: string;
  id: string;
}> = ({ handleFormChange, earnings, value, id }) => {
  return (
    <div
      className={`radio-wrapper icon-input flex items-center pl-5 border border-gray-200 rounded-lg dark:border-gray-700 ${
        earnings === value ? "success" : ""
      }`}
    >
      <span className="form-icon"></span>
      <input
        id={id}
        type="radio"
        name="earnings"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        checked={earnings === value}
        onChange={(e) => {
          if (!e.target.checked) return;
          handleFormChange("earnings", value);
        }}
      />
      <label
        htmlFor={id}
        className="py-5 ml-4 w-full sm:text-lg font-medium cursor-pointer"
      >
        {value}
      </label>
    </div>
  );
};
export default ClaimNow;
