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

    const makeManyToasts = async (toasts: {text: string, type: ToastTypes, ttl: number}[]) => {
        const readyToasts = []
        for (let toast of toasts) {
            readyToasts.push({
                ...toast,
                id: v4(),
                mounted: false,
                dob: Date.now()/1000
            })
        }
        setToasts(readyToasts)
    }

    return {makeToast, mountToast, makeManyToasts}
}

export default useToast