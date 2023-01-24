import { ChangeEvent } from "react";
import CustomCurrencyField from "../CustomCurrencyField";

export enum TAX_YEARS {
  first = "6 April 2018 and 5 April 2019",
  second = "6 April 2019 and 5 April 2020",
  third = "6 April 2020 and 5 April 2021",
  fourth = "6 April 2021 and 5 April 2022",
}

const Refunds = (props: {
  data: any;
  handleFormChange: (field: string, value: string) => void;
}) => {
  const { data, handleFormChange } = props;

  return (
    <div className="grid gap-5 mt-6 mb-5">
      {(Object.keys(TAX_YEARS) as (keyof typeof TAX_YEARS)[]).map(
        (key, _, arr) => {
          return (
            <CustomCurrencyField
              key={key}
              value={data.tax_years?.[key]}
              id={`field-${key}`}
              label={`Between ${TAX_YEARS[key]}`}
              placeholder={"Estimated total"}
              errorClass={` ${
                data.tax_years?.[key]
                  ? "success"
                  : data?.firstEvents?.[key] ||
                    arr.some((k) => k !== key && data.tax_years?.[k])
                  ? ""
                  : "error"
              }`}
              helperClass={` ${
                data.tax_years?.[key]
                  ? "text-green-600 dark:text-green-600"
                  : data?.firstEvents?.[key] ||
                    arr.some((k) => k !== key && data.tax_years?.[k])
                  ? ""
                  : "error"
              }`}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleFormChange(key, e.target.value);
              }}
            />
          );
        }
      )}
    </div>
  );
};

export default Refunds;
