import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import useValue from "@/hooks/useValue";

export const ValueContext = createContext({
    amount: 0,
    setAmount: (value: number) => { },
    checkedYears: [""],
    setCheckedYears: (value: string[]) => { },
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
    setFormData1: (value: any) => { },
    formData2: {
        firstEvent: true,
        employerName: {} as any,
        claimChecked1: true,
        claimChecked2: true,
    },
    setFormData2: (value: any) => { },
    formData3: {
        signatureData: {} as any
    },
    setFormData3: (value: any) => { },
    formData4: {
        firstEvent: true,
        insurance: "",
    },
    setFormData4: (value: any) => { },
    formData5: {
        firstEvent: true,
        paye: "",
    },
    setFormData5: (value: any) => { }
});

export const ValueProvider = ({ children }: { children: any }) => {
    const {
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
    } = useValue();

    return (
        <ValueContext.Provider
            value={{
                amount,
                setAmount,
                checkedYears,
                setCheckedYears,
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
            }}
        >
            {children}
        </ValueContext.Provider>
    );
};

export const useSystemValues = () => useContext(ValueContext);

ValueProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
