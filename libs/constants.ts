import { Earnings } from "@/components/steps/Income";
import { IncomeLevel } from "@/contexts/ValueContext";

export enum TAX_TYPE {
  NONE,
  LAST_YEAR,
  CURRENT_YEAR,
  BOTH,
}

export enum STEP {
  EARNINGS,
  PAYOUTS,
  CONTACT,
  SIGNATURE,
  INSURANCE,
  LENDERS,
  REFUNDS,
  ALL_DONE,
  ERROR,
}


export type DBData = {
  id?: string,
  createdAt: Date,
  firstName: string;
  lastName: string;
  email: string;
  postCode: string;
  address: string;
  birthdate: string;
  signatureData: string;
  insurance: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  link: string;
  signatureUrl: string;
  birthdate_str: string;
  estimated_total: string;
  earnings: Earnings;
  tax_years: Record<string, string>;
  phone: string,
  APR062018_APR052019: string;
  APR062019_APR052020: string;
  APR062020_APR052021: string;
  APR062021_APR052022: string;
  estimated_total_difference: number,
  imported: boolean;
  link_code: string;
  incomeLevel: IncomeLevel
  refunds: {
    [x: string]: {
      year: string;
      amount: number;
    }
  }
}

