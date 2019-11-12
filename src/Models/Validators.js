const Validators = {
    notNegative: {
        errorMessage: "can't be negative",
        validate(value) { return value >= 0 },
    },
    notBlank: {
        errorMessage: "must be specified",
        validate(value) {return value || false}
    },
    email: {
        errorMessage: "inncorrect",
        validate(value) {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(value)
        }
    },
    phone: {
    errorMessage: "inncorrect",
    validate(value) {
        const phoneRegex =  /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/;
        return phoneRegex.test(value)
    }
    }
}

export default Validators;