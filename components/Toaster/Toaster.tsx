import { useContext } from "react"
import ToastContext from "../context/ToastContext"
import Toast from "./Toast"


const Toaster = () => {
    const {toasts} = useContext(ToastContext)  
    return (
        <div className={`fixed right-4 bottom-4 w-60 grid gap-y-3 transition-all z-50`}>
            {toasts.map(toast => {
                return <Toast toast={toast}/>
            })}
        </div>
    )
}

export default Toaster