export const validateEmail = (e: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(e) ? true : false;
};

export const validatePAYE = (e: string) => {
  return /(\w|[0-9])+\/+\w|[0-9]+i/.test(e) ? true : false;
};

export default {
  validateEmail: validateEmail,
  validatePAYE: validatePAYE,
};
