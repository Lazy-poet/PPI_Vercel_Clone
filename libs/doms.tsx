export const PERCENTS = [9, 18, 54, 72, 83, 91, 100];

export const TITLES = [
  (name?: string) => "Select your annual income to see if you qualify",
  (name?: string) => "Your PPI refund(s)",
  (name?: string) => `Its good news ${name}!`,
  (name?: string) => "Your signature",
  (name?: string) => "Confirm your identity",
  (name?: string) => "Your PPI refunds",
  (name?: string) => "Thank you! 🎉",
  (name?: string) => "Apologies, we are unable to proceed",
];

export const SUB_TITLES = (step: any, onClick: any, name: string) => {
  const subtitles = [
    "Tell us about your annual income to see if you qualify",
    "Enter the total amount of PPI received to see if you qualify",
    "Our records show that you're eligible to claim a tax refund. We just need a few more details to complete your claim",
    <span key="tos">
      We need your permission to deal with your application with the HMRC
      directly. We do this by getting your consent via signature. Once your
      application has concluded, we remove this from our records.
    </span>,
    "Your National Insurance (NI) number is essential for HMRC to identify your tax account and process your refund. Our form is encrypted to ensure the safety of your information throughout the process",
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
  "Your Income",
  "Your PPI Payouts",
  "Your Contact",
  "Your Signature",
  "Your (NI) number",
  "Your PPI Refunds",
  "Thank you",
];

export const NEXT_BUTTON_TEXTS = [
  "Next",
  "Check My Eligibility",
  "Next",
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
  "0 seconds remaining...",
];

export const NEXT_BUTTON_HELPERS = (step: any, onClick: any) => {
  const nextButtonHelpers = ["", "", "", "", "", "", ""];
  return nextButtonHelpers[step];
};
