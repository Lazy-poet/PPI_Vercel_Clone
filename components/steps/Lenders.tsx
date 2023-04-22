import { useSystemValues } from "@/contexts/ValueContext";
import { log } from "console";
import React, { ChangeEvent, useState } from "react";

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
  "Other",
];

const Lenders = () => {
  const { lendersData, setLendersData, refunds, setRefunds } =
    useSystemValues();

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: lender, checked } = e.target;
    if (lender === "Other") {
      setLendersData({
        ...lendersData,
        firstEvent: false,
        showOtherLender: checked,
        otherLender: {
          value: "",
          firstEvent: true,
        },
        ...(!checked && {
          selectedLenders: lendersData.selectedLenders.filter(
            (lender) => lender !== lendersData.otherLender.value
          ),
        }),
      });
      return;
    }
    if (!checked) {
      setLendersData({
        ...lendersData,
        firstEvent: false,
        selectedLenders: lendersData.selectedLenders.filter(
          (l) => l !== lender
        ),
      });

      delete refunds[lender];
      setRefunds({ ...refunds });
    } else {
      setLendersData({
        ...lendersData,
        firstEvent: false,
        selectedLenders: [...lendersData.selectedLenders, lender],
      });
      setRefunds({
        ...refunds,
        [lender]: {
          year: "",
          amount: "" as any,
          firstEvent: {
            year: true,
            amount: true,
          },
        },
      });
      console.log("refunds checked");
    }
  };
  return (
    <div>
      <p
        className={`mt-8 mb-4 text-lg font-bold text-gray-900 dark:text-white ${
          !lendersData.firstEvent &&
          !lendersData.selectedLenders.length &&
          !lendersData.showOtherLender
            ? "error"
            : ""
        }`}
      >
        {" "}
        Please select all banks / lenders that refunded your PPI
      </p>
      <div className="items-center w-full text-lg font-medium grid grid-cols-1 sm:grid-cols-2 gap-2">
        {LENDERS.map((lender) => (
          <div
            key={lender}
            className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              id={lender}
              type="checkbox"
              value={lender}
              checked={
                lender === "Other"
                  ? lendersData.showOtherLender
                  : lendersData.selectedLenders.includes(lender)
              }
              onChange={handleSelect}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor={lender}
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {lender}
            </label>
          </div>
        ))}
      </div>
      {lendersData.firstEvent ||
      lendersData.selectedLenders.length ||
      lendersData.showOtherLender ? (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          If you&apos;ve had more than one refund, feel free to select all that
          apply
        </p>
      ) : (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          Please select at least one bank / lender
        </p>
      )}
      {lendersData.showOtherLender && (
        <div
          className={`form-group 
        ${
          lendersData.otherLender.firstEvent
            ? ""
            : lendersData.otherLender.value
            ? "success"
            : "error"
        }
        `}
        >
          <label
            htmlFor="last-name"
            className="block mt-8 mb-4  text-lg font-bold text-gray-900 dark:text-white"
          >
            Who was the other bank/lender?
          </label>
          <div className="icon-input">
            <input
              type="text"
              name="lastName"
              id="last-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white"
              placeholder="Name of the Bank/Lender"
              required
              maxLength={64}
              value={lendersData.otherLender.value}
              onChange={(e) => {
                setLendersData({
                  ...lendersData,
                  otherLender: { value: e.target.value, firstEvent: false },
                });
              }}
            />
            <span className="form-icon"></span>
          </div>
          {/* {fdEvents.lastName ? (
          ""
        ) : !data.lastName ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            Please let us know your last name
          </p>
        ) : (
          data.lastName.length === 1 && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Please enter a valid name
            </p>
          )
        )} */}
        </div>
      )}
    </div>
  );
};

export default Lenders;
