import { useContext, useEffect } from "react"
import ModalsContext from "./modalsContext"
import NewFlowModal from "./newFlowModal"

const ModalOverlay = ({children, modal, clickClose=true}) => {
    const {state, service} = useContext(ModalsContext)
    const isOpen =  state[modal] === true

    return (
        <div 
        onMouseDown={(e) => {
            if (clickClose) {
                service.closeModal(modal)
            }
        }}
        className={`fixed top-0 left-0 w-full h-full p-4 md:p-10 flex justify-center 
        ${isOpen ? "bg-opacity-25 visible" : "bg-opacity-0 invisible"} z-40 bg-black  transition-all duration-300`}>
            {/* <div className={`h-full`} > */}
            {children}
            {/* </div> */}

        </div>
    )
}

export default ModalOverlay