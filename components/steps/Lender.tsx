import { RefundData, useSystemValues } from "@/contexts/ValueContext";
import React, { ChangeEvent } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import CustomCurrencyField from "../CustomCurrencyField";

const LENDERS = [
  "Abbey National",
  "Alliance & Leicester",
  "Barclays",
  "Bank of Scotland",
  "Barclaycard",
  "Black Horse",
  "Capital One",
  "Clydesdale Bank",
  "Egg",
  "Halifax",
  "HSBC",
  "Lloyds Bank",
  "M&S",
  "MBNA",
  "Mint",
  "Nationwide",
  "NatWest",
  "Northern Rock",
  "RBS",
  "Santander",
  "The Co-operative",
  "Yorkshire Bank",
];

const Lender = ({ index }: { index: number }) => {
  const { refunds, setRefunds } = useSystemValues();

  const handleChange = (field: keyof RefundData, value: string) => {
    const refundsCopy = [...refunds];
    refundsCopy[index] = {
      ...refundsCopy[index],
      [field as string]: value,
      firstEvent: {
        ...refundsCopy[index].firstEvent,
        [field as string]: false,
      },
    };
    setRefunds(refundsCopy);
  };

  const data = refunds[index];
  // exclude other selected lenders from dropdown
  const options = LENDERS.filter(
    (len) =>
      !refunds.find((ref) => ref.lender === len && ref.lender !== data.lender)
  );
  const lender = data.lender;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 w-full">
        <div
          className={`mb-5 sm:col-span-2 ${
            data.firstEvent.lender ? "" : data.lender ? "success" : "error"
          }`}
        >
          <label
            htmlFor="lender"
            className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
          >
            Lender name
          </label>
          <FormControl className="w-full mui-select">
            <Select
              id="lender"
              name="lender"
              className="p-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.lender}
              onChange={(e) => handleChange("lender", e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled selected>
                Select Lender
              </MenuItem>
              {options.map((lender) => (
                <MenuItem key={lender} value={lender}>
                  {lender}
                </MenuItem>
              ))}
            </Select>
            <span className="form-icon"></span>
          </FormControl>
        </div>
        <div
          className={`mb-5 sm:col-span-2 ${
            data.firstEvent.year ? "" : data.year ? "success" : "error"
          }`}
        >
          <label
            htmlFor="year"
            className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
          >
            Year of refund
          </label>
          <FormControl className="w-full mui-select">
            <Select
              id="year"
              name="year"
              className="p-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data?.year || ""}
              onChange={(e) => handleChange("year", e.target.value)}
              displayEmpty
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-5 w-full">
        <CustomCurrencyField
          id={`${lender}-amount`}
          value={data?.amount + "" || ""}
          label="Total Amount Received"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("amount", e.target.value)
          }
          errorClass={
            data?.firstEvent?.amount
              ? ""
              : !!data?.amount && Number(data.amount.replace(/,/g, "")) > 0
              ? "success"
              : "error"
          }
          helperClass={
            data?.firstEvent?.amount
              ? ""
              : !!data?.amount && Number(data.amount.replace(/,/g, "")) > 0
              ? "success"
              : "error"
          }
          helperText={
            !data?.firstEvent?.amount && !data?.amount
              ? "Please enter the total PPI refund amount."
              : ""
          }
        />
        <CustomCurrencyField
          id={`${lender}-tax`}
          value={data?.tax_deduction + "" || ""}
          label="Tax Deduction"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("tax_deduction", e.target.value)
          }
          errorClass={
            data?.firstEvent?.tax_deduction
              ? ""
              : !!data?.tax_deduction &&
                Number(data.tax_deduction.replace(/,/g, "")) > 0
              ? "success"
              : "error"
          }
          helperClass={
            data?.firstEvent?.tax_deduction
              ? ""
              : !!data?.tax_deduction &&
                Number(data.tax_deduction.replace(/,/g, "")) > 0
              ? "success"
              : "error"
          }
          helperText={
            !data?.firstEvent?.tax_deduction && !data?.tax_deduction
              ? "Please enter the tax deduction amount."
              : ""
          }
        />
      </div>
    </div>
  );
};

export default Lender;
