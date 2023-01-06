import { useState } from "react";

const useValue = () => {
    const [checkedYears, setCheckedYears] = useState<string[]>([]);
    const [amount, setAmount] = useState<number>(624);
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
    const [formData2, setFormData2] = useState<any>({
        firstEvent: true,
        employerName: null,
        claimChecked1: true,
        claimChecked2: true,
    });
    const [formData3, setFormData3] = useState<any>({
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
        setFormData5
    };
}

export default useValue;