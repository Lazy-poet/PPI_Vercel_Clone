import { useState } from "react";

export const useValue = () => {
  const [checkedYears, setCheckedYears] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(624);
  const [formData1, setFormData1] = useState({
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
  const [formData2, setFormData2] = useState({
    firstEvent: true,
    employerName: { label: "" },
    claimChecked1: true,
    claimChecked2: true,
  });
  const [formData3, setFormData3] = useState({
    signatureData: "",
  });
  const [formData4, setFormData4] = useState({
    firstEvent: true,
    insurance: "",
  });
  const [formData5, setFormData5] = useState({
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
  };
};
