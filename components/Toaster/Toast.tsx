import { useEffect, useMemo, useState } from "react"
import { IToast } from "../context/ToastContext"
import useToast from "../hooks/useToast"


const Toast = ({toast} : {toast: IToast}) => {
    const {mountToast} = useToast()

    // useEffect(() => {
    //     mountToast(toast.id)
    // }, [])

    return useMemo(() => {return (       
    <div className={`transition-all duration-300 h-10 rounded-md p-3
    ${toast.type === "error" && "bg-red-700 text-white"} 
    ${toast.type === "succ" && "bg-green-700 text-white"}
    ${toast.mounted ? "opacity-100" : "opacity-0"}`}>
        {toast.text}
    </div> )}, [toast.mounted])
}

export default Toast