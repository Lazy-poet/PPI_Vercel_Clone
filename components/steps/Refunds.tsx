import { useSystemValues } from "@/contexts/ValueContext";
import Lender from "./Lender";

export enum TAX_YEARS {
  APR062018_APR052019 = "6 April 2018 and 5 April 2019",
  APR062019_APR052020 = "6 April 2019 and 5 April 2020",
  APR062020_APR052021 = "6 April 2020 and 5 April 2021",
  APR062021_APR052022 = "6 April 2021 and 5 April 2022",
}

const Refunds = () => {
  const { refunds, setRefunds } = useSystemValues();

  const addPayout = () => {
    setRefunds([
      ...refunds,
      {
        lender: "",
        year: "",
        amount: "",
        tax_deduction: "",
        firstEvent: {
          lender: true,
          year: true,
          amount: true,
          tax_deduction: true,
        },
      },
    ]);
  };
  return (
    <div className="grid gap-10 mt-6 mb-5">
      {refunds.map(({ lender }, index) => (
        <Lender key={lender} index={index} />
      ))}
      <button
        className="inline-flex justify-center items-center gap-3 p-5 w-full focus:outline-none text-center text-gray-900 bg-[#FCE96A] hover:bg-[#FCE96A] focus:ring-4 focus:ring-green-300 font-semibold rounded-lg dark:focus:ring-green-800"
        onClick={addPayout}
      >
        <span>Add another payout</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
            stroke="#111928"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Refunds;
