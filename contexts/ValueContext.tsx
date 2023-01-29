import React, { createContext, SetStateAction, useContext, useState, Dispatch } from "react";
import PropTypes, { string } from "prop-types";
import { UserData } from "@/libs/constants";

const useValue = () => {
  const [checkedYears, setCheckedYears] = useState<string[]>([]);
  const [amount, setAmount] = useState<string>("");
  const [claimValue, setClaimValue] = useState<number>(0);
  const [showPulse, setShowPulse] = useState<boolean>(false);
  const [addressList, setAddressList] = useState([] as object[]);
  const [urlEmail, setUrlEmail] = useState<any>(null);
  const [urlPhone, setUrlPhone] = useState<any>(null);
  const [dbData, setDbData] = useState({} as UserData);
  const [newUserEmail, setNewUserEmail] = useState<any>(null);
  const [userIp, setUserIp] = useState<string>('');

  const [formData1, setFormData1] = useState<any>({
    firstEvent: true,
    firstName: "",
    lastName: "",
    email: "",
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
    urlEmail,
    setUrlEmail,
    urlPhone,
    setUrlPhone,
    dbData,
    setDbData,
    newUserEmail,
    setNewUserEmail,
    userIp,
    setUserIp,
  };
};

interface Value {
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
    firstEvent: boolean
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
  addressList: object[];
  setAddressList: Dispatch<SetStateAction<object[]>>;
  urlEmail: string;
  setUrlEmail: Dispatch<SetStateAction<string>>;
  urlPhone: string;
  setUrlPhone: Dispatch<SetStateAction<string>>;
  dbData: UserData;
  setDbData: Dispatch<SetStateAction<UserData>>;
  newUserEmail: string
  setNewUserEmail: Dispatch<SetStateAction<string>>,
  userIp: string
  setUserIp: Dispatch<SetStateAction<string>>,
}

export const ValueContext = createContext({} as Value);

export const ValueProvider = ({ children }: React.PropsWithChildren) => {
  const value = useValue();

  return (
    <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
  );
};

export const useSystemValues = () => useContext(ValueContext);

ValueProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
