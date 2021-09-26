import React, { useEffect, useState } from "react"

export type ToastTypes = "error" | "succ"

function objectsAreSame(x, y) {
    var objectsAreSame = true;
    for(var propertyName in x) {
       if(x[propertyName] !== y[propertyName]) {
          objectsAreSame = false;
          break;
       }
    }
    return objectsAreSame;
 }


 const arraysEqual = (a1, a2) => 
   a1.length === a2.length && a1.every((o, idx) => objectsAreSame(o, a2[idx]));


export interface IToast {
    text: string,
    ttl: number,
    type: ToastTypes,
    id: string,
    mounted: boolean,
    dob: number
}
interface ToastContextProps {
    toasts: IToast[],
    setToasts: React.Dispatch<React.SetStateAction<IToast[]>>
}

const ToastContext = React.createContext<Partial<ToastContextProps>>({})


export const ToastContextProvider = ({children}) => {

    const [toasts, setToasts] = useState<IToast[]>([])

    useEffect(() => {
        let timer
        if (toasts.length) {
            timer = setInterval(() => {
                const toastResult = toasts.map(toast =>(
                    {
                        ...toast,
                        mounted: true
                    }
                )).map(toast => {
                    if (toast.ttl < (Date.now()/1000 - toast.dob)) {
                        return {
                            ...toast,
                            mounted: false
                        }
                    }
                    return toast
                })

                if (!arraysEqual(toastResult, toasts)) {
                    setToasts(toastResult)
                }
            }, 5)
        }   
        return () => {
            clearInterval(timer)
        }
    }, [toasts])

    useEffect(() => {
        let timeout
        if (toasts.length && !toasts.map(a => a.mounted).includes(true)) {
            timeout = setTimeout(() => {
                console.log("must be clear")
                setToasts([])
            }, 2000)
        }
        return () => {clearTimeout(timeout)}
    }, [toasts])

    return ( 
    <ToastContext.Provider 
    value={{
        toasts,
        setToasts
    }}
    >
        {children}
    </ToastContext.Provider>)
}

export default ToastContext