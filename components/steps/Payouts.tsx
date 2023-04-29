import { useSystemValues } from "@/contexts/ValueContext";
import { ChangeEvent } from "react";
import CustomCurrencyField from "../CustomCurrencyField";

const Payouts = () => {
  const { firstEvents, setFirstEvents, amount, setClaimValue, setAmount } =
    useSystemValues();

  const calculateClaimFromAmount = (value: string) => {
    value = value.replace(/,/g, "");
    const claim = Math.round(Number(value) * 0.112);
    setClaimValue(claim);
  };
  return (
    <div className="grid gap-5 mt-6 mb-5 sm:grid-cols-2">
      <CustomCurrencyField
        value={amount}
        id="grand-total"
        label="How much PPI did you get back?"
        errorClass={`${
          Number(amount?.replace(/,/g, "")) >= 100
            ? "success"
            : firstEvents.amount
            ? ""
            : "error"
        }`}
        helperText={
          firstEvents.amount
            ? "This can be an estimate"
            : !amount
            ? "Please enter the total PPI refund amount"
            : Number(amount?.replace(/,/g, "")) < 100
            ? "Please enter at least £100"
            : "This can be an estimate"
        }
        helperClass={`${
          Number(amount?.replace(/,/g, "")) >= 100 || firstEvents.amount
            ? ""
            : "error"
        }`}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFirstEvents({ ...firstEvents, amount: false });
          setAmount(e.target.value);
          calculateClaimFromAmount(e.target.value);
        }}
      />
    </div>
  );
};

export default Payouts;
