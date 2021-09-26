import { useContext, useEffect } from "react"
import ToastContext, { ToastTypes } from "../context/ToastContext"
import {v4} from "uuid"

const useToast = () => {
    const {setToasts, toasts} = useContext(ToastContext)





    const makeToast = (text: string, type: ToastTypes, ttl: number) => {

        setToasts([
            ...toasts,
            {
                text,
                ttl,
                type,
                id: v4(),
                mounted: false,
                dob: Date.now()/1000
            }
        ])
    }


    const mountToast = (id: string) => {
        setToasts(
            toasts.map(a => {
                if (a.id === id) {
                    return {
                        ...a,
                        mounted: true
                    }
                }
                return a
            })
        )
    }

    const makeManyToasts = async (toastsArg: {text: string, type: ToastTypes, ttl: number}[]) => {
        const readyToasts = []
        for (let toast of toastsArg) {
            console.log(readyToasts)
            readyToasts.push({
                ...toast,
                id: v4(),
                mounted: false,
                dob: Date.now()/1000
            })
        }
        setToasts([ ...toasts, ...readyToasts,])
    }

    return {makeToast, mountToast, makeManyToasts}
}

export default useToast