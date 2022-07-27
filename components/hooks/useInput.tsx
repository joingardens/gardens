import { Dispatch, SetStateAction, useEffect, useState } from "react";

export class UseInputState<T> {
    value: T
    setValue: Dispatch<SetStateAction<T>>
    error: boolean
    validate: () => boolean
    name: string
}

export function useInput<T> (
    validatior: (a : T) => boolean,
    initState: T,
    name: string
): UseInputState<T> {
    const [value, setValue] = useState<T>(initState)
    const [error, setError] = useState(false)

    const validate = () => {
        if (validatior) {
            const validationResult = validatior(value)
            setError(!validationResult)
            return !validationResult
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
        validate,
        name
    }
}