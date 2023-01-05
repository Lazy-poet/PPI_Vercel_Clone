import Link from "next/link";

export const PERCENTS = [70, 80, 90, 95, 100, 100, 100];

export const TITLES = [
  "Quick quote",
  "Claim now",
  "Sign & complete",
  "One more thing!",
  "Lastly!",
  "Thank you! You're all done",
  "Apologies, we are unable to proceed",
];

export const SUB_TITLES = [
  "Enter your details to receive your estimated tax claim quote",
  "Tell us about your employment so that we can process your claim",
  <span>
    Please carefully read the&nbsp;
    <Link
      href="/"
      target="_blank"
      className="border-b border-gray-500 dark:border-gray-400"
    >
      tax claim documentations
    </Link>
    &nbsp;and the following statements, before Signing
  </span>,
  "We need your National Insurance (NI) number to submit your claim",
  "We also need your Employers PAYE Number to submit your claim",
  "We will be in touch with updates on your claim as soon as we hear anything. All you have to do is sit back, relax and wait until then!",
  "Due to the Pandemic, the government asked the workforce to work from home (WFH) whenever possible. All UK taxpayers may be eligible to claim the full £312 WFH allowance since 6 April 2020, provided they have worked a minimum of one day from home (per year).",
];

export const CONFIRMS = [
  "ClaimingMadeEasy is a trading style of Approved Claims Group Ltd, a HMRC registered Tax Agent. We will handle and process your claim",
  "I confirm that I have paid taxes in the relevant years I am claiming for",
  "I understand that the information I have provided will be shared with HMRC and confirm that this is true and accurate",
  "I understand that ClaimingMadeEasy will be appointed as my tax agent to enable them to submit tax refund claims to HMRC on my behalf and re-claim any overpaid tax",
  "I have read the tax claim documents, agree to the terms of engagement and understand that the information I have provided and my signature will be used to populate a claim form(s) to be sent to HMRC",
];

export const ERRORS = [
  "Even a single online / zoom meeting entitles you to claim the full allowance",
  "Each household member can make a claim",
  "No receipts are required",
  "Includes house shares",
];

export const SIDE_INFO = [
  "Your details",
  "Your employer",
  "Your signature",
  "Your (NI) number",
  "Your employer ref",
];

export const NEXT_BUTTON_HELPERS = [
  "Your personal information will be treated carefully in accordance with our Privacy Policy. We will contact you about claim opportunities using the contact details you provide. You can opt out of receiving communications from us at any time by sending us an email to support@claimingmadeeasy.co.uk",
  "",
  "",
  "",
  "When you click submit, we will receive your personal information and claim documents, to begin processing your tax refund claims. We will handle your data in accordance with our Privacy Policy.",
  "",
  "",
];
