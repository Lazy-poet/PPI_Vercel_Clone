import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  title: string;
  body: string;
  open: boolean;
  onClick: () => void;
};

const Accordion = ({ title, body, open, onClick }: Props) => {
  return (
    <>
      <h2 id="accordion-flush-heading-1" onClick={onClick}>
        <button
          type="button"
          className={`flex justify-between items-center py-5 w-full font-medium text-left text-gray-${
            open ? "900" : "500"
          } bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-${
            open ? "white" : "gray-400"
          }`}
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <span>{title}</span>
          <svg
            data-accordion-icon=""
            className={`w-6 h-6 rotate-${open ? "180" : 0} shrink-0`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={open ? "" : "hidden"}
        aria-labelledby="accordion-flush-heading-1"
      >
        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
          <p className="mb-2 text-gray-500 dark:text-gray-400">{body}</p>
        </div>
      </div>
    </>
  );
};
const questions = [
  {
    title: "What types of financial products are eligible for tax refunds?",
    body: "You may be eligible for a tax refund on payouts from mis-sold PPI, payday loans, and packaged bank accounts",
  },
  {
    title:
      "Can I claim a tax refund even if I've already received compensation for the mis-sold product?",
    body: "Yes, if you were taxed on your compensation payout, you may be eligible for a tax refund. Our team can help you determine if you're eligible and guide you through the process.",
  },
  {
    title: "How much will it cost me to use your service?",
    body: "Our fees are 48% of the tax refund amount we secure for you. There are no upfront costs or hidden fees, and our service is no-win, no-fee",
  },
  {
    title:
      "How much money can I get back from a tax refund on a mis-sold product payout?",
    body: "The amount of your tax refund will depend on various factors, including the amount of the payout and your tax rate. Our experts can help you calculate your potential refund amount.",
  },
  {
    title:
      "How long does it take to receive a tax refund for a mis-sold product?",
    body: " The length of time it takes to receive a tax refund can vary, but we aim to process claims as quickly as possible. Our team will keep you updated on the progress of your claim and provide an estimated timeframe for your refund.",
  },
];
const Faq = () => {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ">
        <h2 className="mb-6 lg:mb-8 text-3xl lg:text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Frequently asked questions
        </h2>
        <div className="mx-auto max-w-screen-md">
          <div
            id="accordion-flush"
            data-accordion="collapse"
            data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            data-inactive-classes="text-gray-500 dark:text-gray-400"
          >
            {questions.map(({ title, body }, index) => (
              <Accordion
                title={title}
                body={body}
                open={open === index}
                onClick={() => setOpen(open === index ? -1 : index)}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
