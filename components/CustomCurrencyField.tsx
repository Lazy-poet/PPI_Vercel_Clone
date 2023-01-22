import React, { useEffect, useRef } from "react";
import AutoNumeric from "autonumeric";

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
      watchExternalChanges: true,
      unformatOnHover: false,
      maximumValue: "100000",
      modifyValueOnWheel: false,
      selectOnFocus: false,
      caretPositionOnFocus: "decimalLeft",
      emptyInputBehavior: "null",
    });

    return () => {
      if (autonumeric.current) {
        autonumeric.current.remove();
      }
    };
  }, []);
  useEffect(() => {
    if (!props.value || Number(props.value) === 0) {
      autonumeric.current.set("");
    }
  }, [props.value]);

  const callEventHandler = (event: any, eventName: string) => {
    if (!props[eventName]) return;
    props[eventName](event, getValue());
  };
  const getValue = () => {
    if (!autonumeric.current) return;
    return autonumeric.current.getNumber();
  };

  return (
    <>
      <div
        className={`form-group sm:col-span-2 my-4
        ${props.claimValue ? "success" : props.firstEvent ? "" : "error"}
        `}
      >
        <label
          htmlFor="email"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          How much PPI did you get back?
        </label>
        <div className="flex relative">
          <div
            className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-xl text-gray-400 dark:text-gray-400
           w-5"
          >
            <span
              className="
              px-2
          text-lg text-gray-400
           bg-transparent dark:text-gray-400 dark:border-gray-600
          "
            >
              £
            </span>
          </div>
          <div className="icon-input w-full md-w-full md:max-w-60">
            <input
              type="text"
              name="currency"
              id="grand-total"
              placeholder="Estimated total"
              className="
              bg-gray-50 border border-gray-300 text-gray-900 
              sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 
              block w-full 
              pl-10
              p-5
              dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-500 dark:placeholder-opacity-75 dark:text-white
               "
              required
              maxLength={64}
              ref={input}
              value={props.value}
              onChange={(e) => callEventHandler(e, "onChange")}
              onFocus={(e) => callEventHandler(e, "onFocus")}
              onBlur={(e) => callEventHandler(e, "onBlur")}
              onKeyPress={(e) => callEventHandler(e, "onKeyPress")}
              onKeyUp={(e) => callEventHandler(e, "onKeyUp")}
              autoComplete="off"
            />
            <span className="form-icon"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyTextField;
