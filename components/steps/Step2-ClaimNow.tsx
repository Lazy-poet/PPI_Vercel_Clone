import { Autocomplete } from "@mui/material";
import { stringify } from "querystring";
import { useEffect, useState } from "react";

interface Company {
  label: string;
  address: string;
  key: number;
}

const ClaimNow = (props: any) => {
  const { data, handleFormChange } = props;
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const search = (query: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "73b7acfe-d3e5-44ba-8f15-7974b1567cf7");

    fetch(
      `https://api.company-information.service.gov.uk/search/companies?q=${
        query ? query : "a"
      }`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        var items = result.items;
        var _companies = [];
        for (var i = 0; i < items.length; i++) {
          _companies.push({
            label: items[i].title as string,
            address: items[i].address_snippet as string,
            key: i,
          });
        }
        setCompanies(_companies);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    search("a");
  }, []);

  return (
    <div className="grid gap-[40px] mt-6 mb-5 sm:grid-cols-2">
      <div
        className={`form-group sm:col-span-2 ${
          data.firstEvent ? "" : data.employerName ? "success" : "error"
        }`}
      >
        <label
          htmlFor="employer"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          How much did you earn?
        </label>

        <div className="grid w-50 gap-3">
          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              id="bordered-radio-1"
              type="radio"
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={data.earnings === "Less than £12,500"}
              onClick={() => handleFormChange("earnings", "Less than £12,500")}
            />
            <label
              htmlFor="bordered-radio-1"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Less than £12,500
            </label>
          </div>
          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              defaultChecked
              id="bordered-radio-2"
              type="radio"
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={data.earnings === "£12,501 to £50,000"}
              onClick={() => handleFormChange("earnings", "£12,501 to £50,000")}
            />
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              £12,501 to £50,000
            </label>
          </div>
          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              id="bordered-radio-2"
              type="radio"
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={data.earnings === "More than £50,001"}
              onClick={() => handleFormChange("earnings", "More than £50,001")}
            />
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              More than £50,001
            </label>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
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
              I haven&apos;t already claimed the working from home allowance
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

export default ClaimNow;
