export const validateEmail = (e: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(e) ? true : false;
};

export const validatePAYE = (e: string) => {
  return /(\w|[0-9])+\/+\w|[0-9]+i/.test(e) ? true : false;
};

const hasObjectValueChanged = (newObj: Record<string, any>, baseObj: Record<string, any>) => {
  return Object.keys(newObj).some((key) => newObj[key] !== baseObj[key]);
}

const isObjectFilled = (obj: Record<string, any>, fields?: string[]) => {
  return (
    !!Object.keys(obj).length &&
    [...(Array.isArray(fields) && fields.length ? fields : Object.keys(obj))]
      .every(key => !["", null, undefined].includes(obj[key]))
  )
}

export default {
  validateEmail,
  validatePAYE,
  hasObjectValueChanged,
  isObjectFilled
};
