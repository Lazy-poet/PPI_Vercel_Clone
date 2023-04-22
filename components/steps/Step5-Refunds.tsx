import { ChangeEvent } from "react";
import CustomCurrencyField from "../CustomCurrencyField";

export enum TAX_YEARS {
  APR062018_APR052019 = "6 April 2018 and 5 April 2019",
  APR062019_APR052020 = "6 April 2019 and 5 April 2020",
  APR062020_APR052021 = "6 April 2020 and 5 April 2021",
  APR062021_APR052022 = "6 April 2021 and 5 April 2022",
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
              errorClass={` ${
                data.tax_years?.[key]
                  ? "success"
                  : data?.firstEvents?.[key] ||
                    arr.some((k) => k !== key && data.tax_years?.[k])
                  ? ""
                  : "error"
              }`}
              helperClass={` ${
                data.tax_years?.[key] ||
                data?.firstEvents?.[key] ||
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
