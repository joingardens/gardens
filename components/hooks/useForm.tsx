import { useEffect, useState } from "react";
import { UseInputState } from "./useInput";

export class FormError {
    constructor(
        public isError: boolean,
        public errorText: string
    ) {}

    static getDefaultState() {
        return new FormError(false, "")
    }
}

export function useForm<T>(
    inputs: UseInputState<string | number | boolean>[],
    handler: () => Promise<T>,
    ) {
    const [ isSubmited, setIsSubmited ] = useState(false)
    const [ formError, setFormError ] = useState(FormError.getDefaultState())
    const [ loading, setLoading ] = useState<boolean>(false)
    const errors = Object.fromEntries(inputs.map(a => [a.name, a.error]))
    const values = Object.fromEntries(inputs.map(a => [a.name, a.value]))


    const submit = async () => {
        setIsSubmited(true)
        const errors = []
        setLoading(true)
        for (let input of inputs) {
            errors.push(input.validate())
        }
        if (Object.values(errors).includes(true)) {
            return false
        } 
        try {
            const result = await handler()
            return result
        }
        catch {
            return false
        }
        finally {
            setLoading(false)
        }
    }

    return {
        submit,
        values,
        errors,
        isSubmited,
        setFormError,
        formError,
        loading,
        setLoading
    }

}