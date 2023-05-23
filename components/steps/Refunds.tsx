import { ChangeEvent } from "react";
import CustomCurrencyField from "../CustomCurrencyField";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useSystemValues } from "@/contexts/ValueContext";

export enum TAX_YEARS {
  APR062018_APR052019 = "6 April 2018 and 5 April 2019",
  APR062019_APR052020 = "6 April 2019 and 5 April 2020",
  APR062020_APR052021 = "6 April 2020 and 5 April 2021",
  APR062021_APR052022 = "6 April 2021 and 5 April 2022",
}

const Refunds = () => {
  const { lendersData, refunds, setRefunds } = useSystemValues();
  const handleChange = (
    field: "year" | "amount" | "tax_deduction",
    lender: string,
    value: string
  ) => {
    setRefunds((prev) => ({
      ...prev,
      [lender]: {
        ...prev[lender],
        [field]: value,
        firstEvent: {
          ...prev[lender].firstEvent,
          [field]: false,
        },
      },
    }));
  };
  return (
    <div className="grid gap-10 mt-6 mb-5">
      {lendersData.selectedLenders
        .concat(
          lendersData.otherLender?.value ? [lendersData.otherLender.value] : []
        )
        .map((lender) => (
          <div key={lender}>
            <div
              className={`mb-5 ${
                refunds[lender]?.firstEvent?.year
                  ? ""
                  : refunds[lender]?.year
                  ? "success"
                  : "error"
              }`}
            >
              <label
                htmlFor="address"
                className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
              >
                Select the year you received your refund from {lender}
              </label>
              <FormControl className="w-full mui-select">
                <Select
                  id="address"
                  name="address"
                  className="p-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={refunds[lender]?.year || ""}
                  onChange={(e) => handleChange("year", lender, e.target.value)}
                  displayEmpty
                  // IconComponent={ExpandMoreIcon}
                >
                  <MenuItem value="" disabled selected>
                    Select Year
                  </MenuItem>
                  <MenuItem value="2018">Before 2018</MenuItem>
                  <MenuItem value="2019">2019</MenuItem>
                  <MenuItem value="2020">2020</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                </Select>
                <span className="form-icon"></span>
              </FormControl>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 flex-col sm:flex-row w-full">
              <CustomCurrencyField
                id={`${lender}-amount`}
                value={refunds[lender]?.amount + "" || ""}
                label="Total Amount Received"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange("amount", lender, e.target.value)
                }
                errorClass={
                  refunds[lender]?.firstEvent?.amount
                    ? ""
                    : !!refunds[lender]?.amount &&
                      Number(refunds[lender].amount.replace(/,/g, "")) > 0
                    ? "success"
                    : "error"
                }
                helperClass={
                  refunds[lender]?.firstEvent?.amount
                    ? ""
                    : !!refunds[lender]?.amount &&
                      Number(refunds[lender].amount.replace(/,/g, "")) > 0
                    ? "success"
                    : "error"
                }
                helperText={
                  !refunds[lender]?.firstEvent?.amount &&
                  !refunds[lender]?.amount
                    ? "Please enter the total PPI refund amount."
                    : ""
                }
              />
              <CustomCurrencyField
                id={`${lender}-tax`}
                value={refunds[lender]?.tax_deduction + "" || ""}
                label="Tax Deduction"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange("tax_deduction", lender, e.target.value)
                }
                errorClass={
                  refunds[lender]?.firstEvent?.tax_deduction
                    ? ""
                    : !!refunds[lender]?.tax_deduction &&
                      Number(refunds[lender].tax_deduction.replace(/,/g, "")) >
                        0
                    ? "success"
                    : "error"
                }
                helperClass={
                  refunds[lender]?.firstEvent?.tax_deduction
                    ? ""
                    : !!refunds[lender]?.tax_deduction &&
                      Number(refunds[lender].tax_deduction.replace(/,/g, "")) >
                        0
                    ? "success"
                    : "error"
                }
                helperText={
                  !refunds[lender]?.firstEvent?.tax_deduction &&
                  !refunds[lender]?.tax_deduction
                    ? "Please enter the tax deduction amount."
                    : ""
                }
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Refunds;
