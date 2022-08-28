class ValidationService {
    validateSubdomainName(string: string) {
        if (!string) {
            return false
        }
        const validationRegex = new RegExp(/[a-z0-9](?:[A-Za-z0-9\-]{0,61}[a-z0-9])/)
        const matchResult = string.match(validationRegex)
        if (!matchResult) {
            return false
        }
        return matchResult.input === matchResult[0]
    }

    validateOrganisationName(string: string) {
        if (string.length > 3 && string.length < 100) {
            return true
        }
        return false
    }

    validateEmail(string: string) {
        if (!string) {
            return false
        }
        const validationRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
        const matchResult = string.match(validationRegex)
        if (!matchResult) {
            return false
        }
        return matchResult.input === matchResult[0]
    }

    validateDomainName(string: string) {
        if (!string) {
            return false
        }
        const validationRegex = new RegExp(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/)
        const matchResult = string.match(validationRegex)
        if (!matchResult) {
            return false
        }
        return matchResult.input === matchResult[0]
    }
}

export const validationService = new ValidationService()

