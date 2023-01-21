import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const useValue = () => {
  const [checkedYears, setCheckedYears] = useState<string[]>([]);
  const [amount, setAmount] = useState<string>('0');
  const [claimValue, setClaimValue] = useState<number>(0);
  const [showPulse, setShowPulse] = useState<boolean>(false);
  const [addressList, setAddressList] = useState([] as object[]);

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
    employerName: null,
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
    firstEvent: true,
    paye: "",
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
    setClaimValue
  };
};

export const ValueContext = createContext({
  amount: '0',
  showPulse: false,
  setShowPulse: (value: boolean) => {},
  setAmount: (value: string) => {},
  claimValue: 0,
  setClaimValue: (value: number) => {},
  checkedYears: [""],
  setCheckedYears: (value: string[]) => {},
  formData1: {
    firstEvent: true,
    firstName: "",
    lastName: "",
    email: "",
    postCode: "",
    address: "",
    day: "",
    month: "",
    year: "",
  },
  setFdEvents1: (value: any) => {},
  fdEvents1: {
    firstName: true,
    lastName: true,
    email: true,
    postCode: true,
    address: true,
    day: true,
    month: true,
    year: true,
  },
  setFormData1: (value: any) => {},
  formData2: {
    firstEvent: true,
    employerName: {} as any,
    earnings: "",
    claimChecked1: true,
    claimChecked2: true,
  },
  setFormData2: (value: any) => {},
  formData3: {
    signatureData: {} as any,
  },
  setFormData3: (value: any) => {},
  formData4: {
    firstEvent: true,
    insurance: "",
  },
  setFormData4: (value: any) => {},
  formData5: {
    firstEvent: true,
    paye: "",
  },
  setFormData5: (value: any) => {},
  addressList: [] as object[],
  setAddressList: (value: any) => {},
});

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
