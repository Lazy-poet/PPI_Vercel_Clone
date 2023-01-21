import React, { useEffect, useRef } from "react";
import AutoNumeric from "autonumeric";
import { TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";

const ValidationTextField = styled(TextField)({
  "& input:not(:focus) + fieldset": {
    borderColor: "#9ca3af !important",
  },
  "& input:valid:focus + fieldset": {
    padding: "4px !important", // override inline-style
  },
});

type Props = {
  [key: string]: any;
};

const CurrencyTextField = (props: Props) => {
  const input = useRef<HTMLInputElement>(null);
  const autonumeric = useRef<any>();

  useEffect(() => {
    if (!input.current) return;
    autonumeric.current = new AutoNumeric(input.current, props.value, {
      ...props.preDefined,
      onChange: undefined,
      onFocus: undefined,
      onBlur: undefined,
      onKeyPress: undefined,
      onKeyUp: undefined,
      onKeyDown: undefined,
      watchExternalChanges: false,
    });

    return () => {
      if (autonumeric.current) {
        autonumeric.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (autonumeric.current) {
      autonumeric.current.set(props.value);
    }
  }, [props.value]);

  const callEventHandler = (event: any, eventName: string) => {
    if (!props[eventName]) return;
    props[eventName](event, getValue());
  };
  const getValue = () => {
    if (!autonumeric.current) return;
    const valueMapper = {
      string: (numeric: any) => numeric.getNumericString(),
      number: (numeric: any) => numeric.getNumber(),
    };
    return valueMapper[props.outputFormat as "string" | "number"](
      autonumeric.current
    );
  };
  const otherProps = {} as Record<string, any>;
  [
    "id",
    "label",
    "className",
    "autoFocus",
    "variant",
    "style",
    "error",
    "disabled",
    "type",
    "name",
    "defaultValue",
    "tabIndex",
    "fullWidth",
    "rows",
    "select",
    "required",
    "helperText",
    "unselectable",
    "margin",
    "SelectProps",
    "multiline",
    "size",
    "FormHelperTextProps",
    "placeholder",
  ].forEach((prop) => (otherProps[prop] = props[prop]));
  return (
    <>
      <ValidationTextField
        inputRef={input}
        onChange={(e) => callEventHandler(e, "onChange")}
        onFocus={(e) => callEventHandler(e, "onFocus")}
        onBlur={(e) => callEventHandler(e, "onBlur")}
        onKeyPress={(e) => callEventHandler(e, "onKeyPress")}
        onKeyUp={(e) => callEventHandler(e, "onKeyUp")}
        onKeyDown={(e) => callEventHandler(e, "onKeyDown")}
        // onMouseOver={() => {}}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              classes={{
                root: "symbol",
              }}
            >
              {props.currencySymbol}
            </InputAdornment>
          ),
          ...props.InputProps,
        }}
        inputProps={{
          ...props.inputProps,
        }}
        classes={{
          root: "currency w-full",
        }}
        sx={{
          "& .MuiInput-input": {
            textAlign: "right !important",
          },
        }}
        {...otherProps}
      />
    </>
  );
};

CurrencyTextField.defaultProps = {
  type: "text",
  variant: "standard",
  currencySymbol: "$",
  outputFormat: "number",
  textAlign: "right",
  maximumValue: "10000000000000",
  minimumValue: "-10000000000000",
};

export default CurrencyTextField;

export const predefinedOptions = AutoNumeric.getPredefinedOptions();
