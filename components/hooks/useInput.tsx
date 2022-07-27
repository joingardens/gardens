import { useEffect, useState } from "react";

export function useInput (
    validatior: (a : string) => boolean
) {
    const [value, setValue] = useState("")
    const [error, setError] = useState(false)

    const validate = () => {
        if (validatior) {
            const validationResult = validatior(value)
            setError(validationResult)
            return validationResult
        } 
        return true
    }

    useEffect(() => {
        if (value) {
            validate()
        }
    }, [value])

    return {
        value,
        setValue,
        error, 
        validate
    }
}