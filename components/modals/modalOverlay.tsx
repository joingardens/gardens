import { useContext } from "react"
import ModalsContext from "./modalsContext"
import NewFlowModal from "./newFlowModal"

const ModalOverlay = ({children, modal}) => {
    const {state, service} = useContext(ModalsContext)
    const isOpen =  state[modal] === true
    return (
        <div 
        onMouseUp={(e) => {
            service.closeAll()
        }}
        className={`fixed top-0 left-0 w-full h-full p-4 md:p-10 grid place-items-center 
        ${isOpen ? "bg-opacity-25 visible" : "bg-opacity-0 invisible"} z-50 bg-black  transition-all duration-300`}>
            {children}
        </div>
    )
}

export default ModalOverlay