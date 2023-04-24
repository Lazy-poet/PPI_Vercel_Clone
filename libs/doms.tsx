export const PERCENTS = [9, 18, 36, 54, 72, 81, 90, 95, 100];

export const TITLES = [
  (name?: string) =>
    `${name}, What Was Your Income When You Received Your PPI Payout(s)?`,
  (name?: string) => `Great News, ${name}! You're Eligible to Claim`,
  (name?: string) => `${name}, Let's Proceed With Your Claim`,
  (name?: string) => `${name}, Enter Your Address`,
  (name?: string) => `${name}, We Need Your Permission to Get Started`,
  (name?: string) => `${name}, We Need Your National Insurance Number`,
  (name?: string) =>
    `${name}, Select the Lenders You Received PPI Payouts From`,
  (name?: string) => `${name}, Provide the PPI Refund Details for Each Lender`,
  (name?: string) => `Thank You, ${name}! Your Claim Has Been Submitted 🎉`,
  (name?: string) => "Apologies, we are unable to proceed",
];

export const SUB_TITLES = (step: any, onClick: any, name: string) => {
  const subtitles = [
    "To accurately assess your eligibility for a PPI tax refund, please select the income level that best represents your situation during the time(s) you received the payout(s).",
    "Please enter the total amount of PPI payouts you received",
    "Please provide your contact details to proceed with your claim. We'll use these details to keep you updated on your claim via email or SMS. We won't call you.",
    "Please provide your current residential address.",
    "Please sign below to authorize us to deal with your application with the HMRC directly",
    "Your National Insurance Number (NIN) is required for processing your claim with HMRC. We ensure that your information is securely stored and used only for the purpose of your claim",
    "Choose all lenders you received PPI refunds from.",
    "Enter the year, total amount received, and tax deduction for each lender selected.",
    "You have successfully completed your claim. We will now process your application and keep you updated on its progress",
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
  "Your Address",
  "Your signature",
  "Your (NI) number",
  "Your Lenders",
  "Your PPI refunds",
  "Thank you",
];

export const NEXT_BUTTON_TEXTS = [
  "Verify My Eligibility",
  "Proceed to Contact Details",
  "Next",
  "Next",
  "Confirm and Continue",
  "Proceed to PPI Refunds Breakdown",
  "Next",
  "Complete My Claim",
];

export const NEXT_BUTTON_TIMERS = [
  "55 seconds remaining...",
  "30 seconds remaining...",
  "25 seconds remaining...",
  "20 seconds remaining...",
  "15 seconds remaining...",
  "10 seconds remaining...",
  "5 seconds remaining...",
  "",
];

export const NEXT_BUTTON_HELPERS = (step: any, onClick: any) => {
  const nextButtonHelpers = [
    "",
    "",
    "",
    "We do not use this information to send any paperwork",
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
