export const PERCENTS = [9, 18, 73, 82, 91, 100, 100];

export const TITLES = [
  "Your income",
  "Your details",
  "Your signature",
  "Confirm your identity",
  "Your PPI refunds",
  "Thank you! 🎉",
  "Apologies, we are unable to proceed",
];

export const SUB_TITLES = (step: any, onClick: any) => {
  const subtitles = [
    "Tell us about your annual income to see if you qualify",
    "If you want to claim your tax refund you must provide your details below",
    <span key="tos">
      Your signature will be applied to a&nbsp;
      <button
        onClick={() => onClick("authorise_agent_64-8.pdf")}
        className="border-b border-gray-500 dark:border-gray-400"
      >
        64-8
      </button>
      &nbsp;form to authorise us as your agent. Please read our&nbsp;
      <button
        onClick={() => onClick("terms-of-service.pdf")}
        className="border-b border-gray-500 dark:border-gray-400"
      >
        terms of service
      </button>
      &nbsp;before proceeding.
    </span>,
    "We need your National Insurance (NI) number to identify your tax account. Your refund can't be issued without it!",
    "How much PPI did you receive in the following tax years",
    <span key="what-happens-next">
      <strong>What happens next?</strong> We will be in touch with updates on
      your claim as soon as we hear anything. All you have to do is sit back,
      relax and wait until then!
    </span>,
    "Due to the Pandemic, the government asked the workforce to work from home (WFH) whenever possible. All UK taxpayers may be eligible to claim the full £312 WFH allowance since 6 April 2020, provided they have worked a minimum of one day from home (per year).",
  ];
  return <>{subtitles[step]}</>;
};

export const CONFIRMS = [
  "I understand that ClaimingMadeEasy is a trading style of Approved Claims Group Ltd, a HMRC registered Tax Agent",
  "I understand that the information I have provided will be shared with HMRC and confirm that this is true and accurate",
  "I understand that ClaimingMadeEasy will be assigned as my nominee to enable them to submit tax refund claims to HMRC on my behalf and re-claim any overpaid tax",
  "I have read the tax claim documents, agree to the terms of service and understand that the information I have provided and my signature will be used to populate a claim form(s) to be sent to HMRC",
];

export const ERRORS = [
  "Even a single online / zoom meeting entitles you to claim the full allowance",
  "Each household member can make a claim",
  "No receipts are required",
  "Includes house shares",
];

export const SIDE_INFO = [
  "Your income",
  "Your details",
  "Your signature",
  "Your (NI) number",
  "Your PPI refunds",
  "Thank you",
];

export const NEXT_BUTTON_TIMERS = [
  "It only takes a minute",
  "52 seconds left...",
  "22 seconds left...",
  "19 seconds left...",
  "15 seconds left...",
  "",
];

export const NEXT_BUTTON_HELPERS = (step: any, onClick: any) => {
  const nextButtonHelpers = [
    "",
    <span key="2">
      Your personal information will be treated carefully in accordance with
      our&nbsp;
      <a
        href="#"
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        onClick={(e) => {
          e.preventDefault();
          onClick("privacy-policy.pdf");
        }}
      >
        Privacy Policy
      </a>
      .
    </span>,
    "",
    "",
    <span key="5">
      When you click submit, we&apos;ll begin processing your tax refund claims. We
      will handle your data in accordance with our&nbsp;
      <a
        href="#"
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        onClick={(e) => {
          e.preventDefault();
          onClick("privacy-policy.pdf");
        }}
      >
        Privacy Policy
      </a>
      .
    </span>,
    "",
    "",
  ];
  return nextButtonHelpers[step];
};
