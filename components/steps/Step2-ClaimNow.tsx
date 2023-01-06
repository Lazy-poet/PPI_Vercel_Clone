import { Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";

const ClaimNow = (props: any) => {
  const { data, handleFormChange } = props;
  const [companies, setCompanies] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    search('a');
  }, []);

  const search = (query: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "73b7acfe-d3e5-44ba-8f15-7974b1567cf7");

    var requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      crossDomain: true,
      redirect: 'follow'
    };

    fetch(`https://api.company-information.service.gov.uk/search/companies?q=${query ? query : 'a'}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        var items = result.items;
        var _companies = [];
        for (var i = 0; i < items.length; i++) {
          _companies.push({
            label: items[i].title,
            key: i
          });
        }
        setCompanies(_companies);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="grid gap-5 mt-6 mb-5 sm:grid-cols-2">
      <div className={`form-group sm:col-span-2 ${data.firstEvent ? '' : (data.employerName ? 'success' : 'error')}`}>
        <label
          htmlFor="employer"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          What was the name of your employer?
        </label>
        <div className="icon-input">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="w-full"
            freeSolo={false}
            popupIcon={""}
            options={companies}
            renderOption={(props, option: any, { selected }) => (
              <li {...props} key={option.key}>{option.label.trim('"')}</li>
            )}
            value={data.employerName}
            onChange={(e: any, newValue: any) => {
              handleFormChange('employerName', newValue);
            }}
            inputValue={searchQuery}
            onInputChange={(e, newInputValue) => {
              setSearchQuery(newInputValue);
              search(newInputValue);
            }}
            renderInput={(params) =>
              <div ref={params.InputProps.ref}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  {...params.inputProps}
                  name="employerName"
                  placeholder="Name Of Employer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg block w-full p-4 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
            }
          />
          <span className="form-icon"></span>
        </div>
        {
          data.firstEvent
            ?
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Please write your employer&apos;s name as it appears on your payslip
            </p>
            :
            !data.employerName
              ?
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Please write your employer&apos;s name as it appears on your payslip
              </p>
              :
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Please write your employer&apos;s name as it appears on your payslip
              </p>
        }
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
              onChange={(e) => handleFormChange('claimChecked1', e.target.checked)}
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
              onChange={(e) => handleFormChange('claimChecked2', e.target.checked)}
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
