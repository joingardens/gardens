import { useState } from "react";
import { UseInputState } from "./useInput";

export function useForm<T>(
    inputs: UseInputState<string | number | boolean>[],
    handler: () => Promise<T>
    ) {
    const [ isSubmited, setIsSubmited ] = useState(false)
    const errors = Object.fromEntries(inputs.map(a => [a.name, a.error]))
    const values = Object.fromEntries(inputs.map(a => [a.name, a.value]))
    const submit = () => {
        setIsSubmited(true)
        for (let input of inputs) {
            const result = input.validate()
        }
        if (Object.values(errors).includes(true)) {
            return false
        } 
        try {
            const result = handler()
            return result
        }
        catch {
            return false
        }
    }

    return {
        submit,
        values,
        errors,
        isSubmited
    }

}