export const validateEmail = (e: string) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) ? true : false
}

export const validatePAYE = (e: string) => {
    return (/(\w|[0-9])+\/+\w|[0-9]+i/.test(e)) ? true : false
}

export default {
    validateEmail: validateEmail,
    validatePAYE: validatePAYE
}