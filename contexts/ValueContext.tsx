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
  incomeLevel: IncomeLevel;
  signatureData: string;
};

export type FirstEvents = {
  [key in keyof UserData]: boolean;
} & {
  lendersData: boolean;
  otherLender: boolean;
  insurance: boolean;
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
    incomeLevel: "" as IncomeLevel,
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
    incomeLevel: true,
    lendersData: true,
    otherLender: true,
    signatureData: true,
    insurance: true,
  });
  const [formData1, setFormData1] = useState<any>({
    firstEvent: true,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postCode: "",
    address: "",
    day: "",
    month: "",
    year: "",
  });
  const [fdEvents1, setFdEvents1] = useState<any>({
    firstName: true,
    lastName: true,
    email: true,
    postCode: true,
    address: true,
    phone: true,
    day: true,
    month: true,
    year: true,
  });
  const [formData2, setFormData2] = useState<any>({
    firstEvent: true,
    earnings: null,
    claimChecked1: true,
    claimChecked2: true,
  });
  const [formData3, setFormData3] = useState<any>({
    firstEvent: true,
    signatureData: null,
    checked: true,
  });
  const [formData4, setFormData4] = useState<any>({
    firstEvent: true,
    insurance: "",
  });
  const [formData5, setFormData5] = useState<any>({
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
  return {
    checkedYears,
    amount,
    setCheckedYears,
    setAmount,
    formData1,
    setFormData1,
    formData2,
    setFormData2,
    formData3,
    setFormData3,
    formData4,
    setFormData4,
    formData5,
    setFormData5,
    fdEvents1,
    setFdEvents1,
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
  formData1: {
    firstEvent: boolean;
    firstName: string;
    lastName: string;
    email: string;
    postCode: string;
    address: string;
    day: string;
    month: string;
    year: string;
  };
  setFdEvents1: Dispatch<SetStateAction<{ [x: string]: boolean }>>;
  fdEvents1: {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    postCode: boolean;
    address: boolean;
    day: boolean;
    month: boolean;
    year: boolean;
  };
  setFormData1: Dispatch<SetStateAction<{ [x: string]: any }>>;
  formData2: {
    firstEvent: true;
    earnings: string;
  };
  setFormData2: Dispatch<SetStateAction<{ [x: string]: any }>>;
  formData3: {
    signatureData: string;
    firstEvent: boolean;
    checked: boolean;
  };
  setFormData3: Dispatch<SetStateAction<{ [x: string]: any }>>;
  formData4: {
    firstEvent: boolean;
    insurance: string;
  };
  setFormData4: Dispatch<SetStateAction<{ [x: string]: any }>>;
  formData5: {
    firstEvents: {
      APR062018_APR052019: boolean;
      APR062019_APR052020: boolean;
      APR062020_APR052021: boolean;
      APR062021_APR052022: boolean;
    };
    tax_years: Record<string, string>;
  };
  setFormData5: Dispatch<SetStateAction<{ [x: string]: any }>>;
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
}

export const ValueContext = createContext({} as Value);

export const ValueProvider = ({ children }: React.PropsWithChildren) => {
  const value = useValue();

  return (
    <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
  );
};

export const useSystemValues = () => useContext(ValueContext);
