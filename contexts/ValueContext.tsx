import { Earnings } from "@/components/steps/Income";
import { DBData } from "@/libs/constants";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
  Dispatch,
} from "react";

export enum IncomeLevel {
  UPA = "Under Personal Allowance",
  BR = "Basic Rate",
  ABR = "Above Basic Rate",
}
type LendersData = {
  selectedLenders: string[];
  showOtherLender: boolean;
  otherLender: {
    value: string;
    firstEvent: boolean;
  };
  firstEvent: boolean;
};
export type REFUNDS = Record<
  string,
  {
    year: string;
    amount: string;
    tax_deduction: string;
    firstEvent: {
      [key: string]: boolean;
    };
  }
>;

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  postCode: string;
  address: string;
  phone: string;
  day: string;
  month: string;
  year: string;
  earnings: Earnings;
  incomeLevel: IncomeLevel;
  signatureData: string;
  insurance: string;
};

export type FirstEvents = {
  [key in keyof UserData]: boolean;
} & {
  lendersData: boolean;
  otherLender: boolean;
  amount: boolean;
};

const useValue = () => {
  const [checkedYears, setCheckedYears] = useState<string[]>([]);
  const [amount, setAmount] = useState<string>("");
  const [claimValue, setClaimValue] = useState<number>(0);
  const [showPulse, setShowPulse] = useState<boolean>(false);
  const [addressList, setAddressList] = useState([] as object[]);
  const [linkCode, setLinkCode] = useState<any>(null);
  const [dbData, setDbData] = useState({} as DBData);
  const [userEmail, setUserEmail] = useState<any>(null);
  const [userPhone, setUserPhone] = useState<any>(null);
  const [userIp, setUserIp] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [refunds, setRefunds] = useState({} as REFUNDS);
  const [showLoadingPage, setShowLoadingPage] = useState(false);
  const [lendersData, setLendersData] = useState<LendersData>({
    selectedLenders: [],
    showOtherLender: false,
    otherLender: {
      value: "",
      firstEvent: true,
    },
    firstEvent: true,
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    postCode: "",
    address: "",
    phone: "",
    day: "",
    month: "",
    year: "",
    signatureData: "",
    earnings: "" as Earnings,
    incomeLevel: "" as IncomeLevel,
    insurance: "",
  } as UserData);
  const [firstEvents, setFirstEvents] = useState({
    firstName: true,
    lastName: true,
    email: true,
    postCode: true,
    address: true,
    phone: true,
    day: true,
    month: true,
    year: true,
    earnings: true,
    incomeLevel: true,
    lendersData: true,
    otherLender: true,
    signatureData: true,
    insurance: true,
    amount: true,
  });

  const [taxYears, setTaxYears] = useState<any>({
    firstEvents: {
      APR062018_APR052019: true,
      APR062019_APR052020: true,
      APR062020_APR052021: true,
      APR062021_APR052022: true,
    },
    tax_years: {},
  });

  const openPdf = (path: string) => {
    setFileURL(path);
  };
  const handleFormChange = (key: string, value: string) => {
    setUserData({
      ...userData,
      [key]: value,
    });
    if (key === "day" || key === "month" || key === "year") {
      setFirstEvents({
        ...firstEvents,
        day: false,
        month: false,
        year: false,
      });
    } else {
      setFirstEvents({
        ...firstEvents,
        [key]: false,
      });
    }
  };
  return {
    checkedYears,
    amount,
    setCheckedYears,
    setAmount,
    taxYears,
    setTaxYears,
    showPulse,
    setShowPulse,
    addressList,
    setAddressList,
    claimValue,
    setClaimValue,
    linkCode,
    setLinkCode,
    dbData,
    setDbData,
    userEmail,
    setUserEmail,
    userIp,
    setUserIp,
    userPhone,
    setUserPhone,
    fileURL,
    setFileURL,
    open,
    setOpen,
    openPdf,
    ready,
    setReady,
    lendersData,
    setLendersData,
    refunds,
    setRefunds,
    userData,
    setUserData,
    firstEvents,
    setFirstEvents,
    showLoadingPage,
    setShowLoadingPage,
    handleFormChange,
  };
};

interface Value {
  openPdf: (path: string) => void;
  amount: string;
  showPulse: boolean;
  setShowPulse: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<string>>;
  claimValue: number;
  setClaimValue: Dispatch<SetStateAction<number>>;
  taxYears: {
    firstEvents: {
      APR062018_APR052019: boolean;
      APR062019_APR052020: boolean;
      APR062020_APR052021: boolean;
      APR062021_APR052022: boolean;
    };
    tax_years: Record<string, string>;
  };
  setTaxYears: Dispatch<SetStateAction<{ [x: string]: any }>>;
  addressList: Record<string, any>[];
  setAddressList: Dispatch<SetStateAction<Record<string, any>[]>>;
  linkCode: string;
  setLinkCode: Dispatch<SetStateAction<string>>;
  dbData: DBData;
  setDbData: Dispatch<SetStateAction<DBData>>;
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
  userPhone: string;
  setUserPhone: Dispatch<SetStateAction<string>>;
  userIp: string;
  setUserIp: Dispatch<SetStateAction<string>>;
  fileURL: string | null;
  setFileURL: Dispatch<SetStateAction<string | null>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  ready: boolean;
  setReady: Dispatch<SetStateAction<boolean>>;
  lendersData: LendersData;
  setLendersData: Dispatch<SetStateAction<LendersData>>;
  refunds: REFUNDS;
  setRefunds: Dispatch<SetStateAction<REFUNDS>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  firstEvents: FirstEvents;
  setFirstEvents: Dispatch<SetStateAction<FirstEvents>>;
  showLoadingPage: boolean;
  setShowLoadingPage: Dispatch<SetStateAction<boolean>>;
  handleFormChange: (key: string, value: string) => void;
}

export const ValueContext = createContext({} as Value);

export const ValueProvider = ({ children }: React.PropsWithChildren) => {
  const value = useValue();

  return (
    <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
  );
};

export const useSystemValues = () => useContext(ValueContext);
