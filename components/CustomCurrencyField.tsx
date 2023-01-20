import React from "react";
import CurrencyTextField from "packages/CurrencyTextField";
type Props = {};

const CustomCurrencyField = (props: Props) => {
  return (
    <CurrencyTextField
      label="Amount"
      variant="outlined"
      placeholder="Estimated grand total"
      minimumValue={"0"}
      currencySymbol="£"
    />
  );
};

export default CustomCurrencyField;
