export const PERCENTS = [9, 18, 73, 82, 91, 100, 100];

export const TITLES = [
  "Your income",
  "Your details",
  "Your signature",
  "Confirming your identity",
  "Your PPI refunds!",
  "Thank you! You're all done",
  "Apologies, we are unable to proceed",
];

export const SUB_TITLES = (step: any, onClick: any) => {
  const subtitles = [
    "Tell us about your annual income to see if you’re entitled to claim",
    "If you want to claim your tax refund you must provide your details below",
    <span key="tos">
      We will submit these&nbsp;
      <button
        onClick={() => onClick("P87+64-8+R38.pdf")}
        className="border-b border-gray-500 dark:border-gray-400"
      >
        official documents
      </button>
      &nbsp;on your behalf. Please read our&nbsp;
      <button
        onClick={() => onClick("terms-of-service.pdf")}
        className="border-b border-gray-500 dark:border-gray-400"
      >
        terms of service
      </button>
      &nbsp;before proceeding.
    </span>,
    "We need your National Insurance (NI) number to identify your tax account. Your refund cannot be issued without this",
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
  "ClaimingMadeEasy is a trading style of Approved Claims Group Ltd, a HMRC registered Tax Agent. We will handle and process your claim",
  "I confirm that I have paid taxes in the relevant years I am claiming for",
  "I understand that the information I have provided will be shared with HMRC and confirm that this is true and accurate",
  "I understand that ClaimingMadeEasy will be appointed as my tax agent to enable them to submit tax refund claims to HMRC on my behalf and re-claim any overpaid tax",
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
  "22 seconds left...",
  "16 seconds left...",
  "11 seconds left...",
  "5 seconds left...",
  "",
  "",
  "",
];

export const NEXT_BUTTON_HELPERS = (step: any, onClick: any) => {
  const nextButtonHelpers = [
    <span>
      Your personal information will be treated carefully in accordance with
      our&nbsp;
      <button
        onClick={() => onClick("privacy-policy.pdf")}
        className="border-b border-gray-500 dark:border-gray-400"
      >
        Privacy Policy
      </button>
      . We will contact you about claim opportunities using the contact details
      you provide. You can opt out of receiving communications from us at any
      time by sending us an email to support@claimingmadeeasy.co.uk
    </span>,
    "",
    "",
    "",
    <span>
      When you click submit, we will receive your personal information and claim
      documents, to begin processing your tax refund claims. We will handle your
      data in accordance with our&nbsp;
      <button
        onClick={() => onClick("privacy-policy.pdf")}
        className="border-b border-gray-500 dark:border-gray-400"
      >
        Privacy Policy
      </button>
      .
    </span>,
    "",
    "",
  ];
  return nextButtonHelpers[step];
};
