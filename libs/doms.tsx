export const PERCENTS = [9, 18, 54, 72, 81, 90, 95, 100];

export const TITLES = [
  (name?: string) => "Your income",
  (name?: string) => `Its good news ${name}!`,
  (name?: string) => "Your details",
  (name?: string) => "Your signature",
  (name?: string) => "Confirm your identity",
  (name?: string) => "Your Lenders",
  (name?: string) => "Your PPI refunds",
  (name?: string) => "Thank you! 🎉",
  (name?: string) => "Apologies, we are unable to proceed",
];

export const SUB_TITLES = (step: any, onClick: any, name: string) => {
  const subtitles = [
    "Tell us about your annual income to see if you qualify",
    "Our records show that you could be owed a refund of £100s, maybe even £1,000s. We just need a few details to complete your claim",
    "Complete your details below to start your claim today",
    <span key="tos">
      We need your permission to deal with your application with the HMRC
      directly. We do this by getting your consent via signature. Once your
      application has concluded, we remove this from our records.
    </span>,
    "HMRC requires your National Insurance (NI) number to identify your tax account. Your refund can’t be issued without it!",
    "We now need to know which lenders you received a PPI refund from",
    "Enter the year, total amount received, and tax deduction for each lender selected.",
    <span key="what-happens-next">
      <strong>What happens next?</strong> We&apos;ll be in touch with updates on
      your claim as soon as we hear anything. All you have to do is sit back,
      relax and wait until then!
    </span>,
    "Due to the Pandemic, the government asked the workforce to work from home (WFH) whenever possible. All UK taxpayers may be eligible to claim the full £312 WFH allowance since 6 April 2020, provided they have worked a minimum of one day from home (per year).",
  ];
  return <>{subtitles[step]}</>;
};

export const CONFIRMS = [
  "I understand that the information I have provided will be shared with HMRC and confirm that this is true and accurate",
  "I have read the tax claim documents, agree to the terms of service and understand that the information I have provided and my signature will be used to populate a claim form(s) to be sent to HMRC",
  "I understand that the tax agent as named in the terms of service will be assigned as my nominee to enable them to submit tax refund claims to HMRC on my behalf and re-claim any overpaid tax",
];

export const ERRORS = [
  "Even a single online / zoom meeting entitles you to claim the full allowance",
  "Each household member can make a claim",
  "No receipts are required",
  "Includes house shares",
];

export const SIDE_INFO = [
  "Your Income",
  "Your PPI Payouts",
  "Your Contact",
  "Your Signature",
  "Your (NI) number",
  "Your Lenders",
  "Your PPI Refunds",
  "Thank you",
];

export const NEXT_BUTTON_TEXTS = [
  "Verify My Eligibility",
  "Next",
  "Next",
  "Confirm and Continue",
  "Next",
  "Next",
  "Complete My Claim",
];

export const NEXT_BUTTON_TIMERS = [
  "55 seconds remaining...",
  "30 seconds remaining...",
  "25 seconds remaining...",
  "15 seconds remaining...",
  "10 seconds remaining...",
  "5 seconds remaining...",
  "",
];

export const NEXT_BUTTON_HELPERS = (step: any, onClick: any) => {
  const nextButtonHelpers = [
    "",
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
    "",
    "",
  ];
  return nextButtonHelpers[step];
};
