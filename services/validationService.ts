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
}

export const validationService = new ValidationService()

