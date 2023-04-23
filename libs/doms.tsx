export const PERCENTS = [9, 18, 73, 82, 91, 100, 100];

export const TITLES = [
  (name?: string) => name + ", Select Your Income Level",
  (name?: string) => `Congratulations, ${name}! You Qualify!`,
  (name?: string) => `${name}, Enter Your Address`,
  (name?: string) => `${name}, Sign to Confirm Your Claim`,
  (name?: string) => "Confirm your identity",
  (name?: string) => "Your Lenders",
  (name?: string) => "Your PPI refunds",
  (name?: string) => "Thank you! 🎉",
  (name?: string) => "Apologies, we are unable to proceed",
];

export const SUB_TITLES = (step: any, onClick: any, name: string) => {
  const subtitles = [
    "Your eligibility for a tax refund depends on your income.",
    "Please provide your contact details to proceed with your claim. We'll use these details to keep you updated on your claim via email or SMS. We won't call you.",
    "Please provide your current residential address.",
    <span key="tos">
      By signing, you agree to our{" "}
      <button
        onClick={() => onClick("terms-of-service.pdf")}
        className="border-b border-gray-500 dark:border-gray-400"
      >
        terms
      </button>{" "}
      and authorize us to proceed with your claim.
    </span>,
    "HMRC requires your National Insurance (NI) number to identify your tax account. Your refund can’t be issued without it!",
    "We now need to know which lenders you received a PPI refund from",
    "How much PPI did you receive in the last four tax years",
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
  "Your income",
  "Your details",
  "Your signature",
  "Your (NI) number",
  "Your PPI refunds",
  "Thank you",
];

export const NEXT_BUTTON_TEXTS = [
  "Verify My Eligibility",
  "Continue to Address",
  "Proceed to Signature",
  "Confirm and Continue",
  "Submit NIN",
  "Complete My Claim",
];

export const NEXT_BUTTON_TIMERS = [
  "55 seconds remaining...",
  "35 seconds remaining...",
  "25 seconds remaining...",
  "20 seconds remaining...",
  "10 seconds remaining...",
  "0 seconds remaining...",
  "",
];

export const NEXT_BUTTON_HELPERS = (step: any, onClick: any) => {
  const nextButtonHelpers = [
    "Note: Higher and additional rate taxpayers do not qualify.",
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
    <span key="3">
      By clicking next, you are confirming that you have read and agree with
      the&nbsp;
      <a
        href="#"
        className="hover:underline"
        onClick={(e) => {
          e.preventDefault();
          onClick("terms-of-service.pdf");
        }}
      >
        terms & conditions
      </a>
      &nbsp;and that the information you have given on this form is correct, to
      the best of your knowledge
    </span>,
    "",
    "",
    <span key="5">
      When you click submit, we&apos;ll begin processing your tax refund claims.
      We&apos;ll handle your data in accordance with our&nbsp;
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
