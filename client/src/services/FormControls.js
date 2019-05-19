import is from 'is_js'

export default class FormControls {
    static validate(value, validation = null) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    static validateForm(formControls, excludeControls) {
        let isFormValid = true

        for (const control in formControls) {
            if (excludeControls.includes(control)) continue
            if (formControls.hasOwnProperty(control)) {
                isFormValid = formControls[control].valid && isFormValid
            }
        }

        return isFormValid
    }

    static isInvalid(valid, touched, shouldValidate) {
        return !valid && shouldValidate && touched
    }
}
