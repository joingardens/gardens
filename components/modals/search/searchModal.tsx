import { useContext } from "react"
import Search from "../../../pages/search"
import Cross from "../../icons/Cross"
import ModalOverlay from "../modalOverlay"
import ModalsContext from "../modalsContext"

const SearchModal = () => {

    const {state, service} = useContext(ModalsContext)

    const isOpen = state["search"]

    
    return (
        <ModalOverlay modal={"search"}>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onMouseUp={(e) => {
                    e.stopPropagation()
                }}
                onMouseDown={(e) => {e.stopPropagation()}}
                className={`
                    overflow-y-auto max-w-3xl w-full h-full relative z-50 bg-white rounded-lg
                    ${isOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-75"}
                    transition-all duration-300 transform origin-center
                    pb-10 overflow-x-hidden  p-4
                    `}>
                <div className={`w-full flex min-w-full mb-8`}>
                <Search/>
                    <div 
                    onClick={() => {
                        service.closeModal("search")
                    }}
                    className={`w-6 h-6 text-gray-600 cursor-pointer ml-4`}>
                        <Cross/>
                    </div>
                </div>
            </div>
        </ModalOverlay>
    )
}

export default SearchModal