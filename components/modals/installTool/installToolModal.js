import { useContext } from "react"
import Cross from "../../icons/Cross"
import ModalOverlay from "../modalOverlay"
import ModalsContext from "../modalsContext"
import PrettyBlock from '../../../components/ui/PrettyBlock';

const InstallToolModal = () => {

    const {state, service} = useContext(ModalsContext)

    const isOpen = state["installTool"]

    
    return (
        <ModalOverlay modal={"installTool"}>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onMouseUp={(e) => {
                    e.stopPropagation()
                }}
                onMouseDown={(e) => {e.stopPropagation()}}
                className={`
                    my-auto relative z-50 bg-white rounded-lg
                    ${isOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-75"}
                    transition-all duration-300 transform origin-center
                    pb-10 overflow-x-hidden  p-4
                    `}>
                <div className="mt-4" />
                <div className={`flex flex-col justify-center items-center h-full`}>
                <h2 className="text-xl font-bold">Confirm installation</h2>
                <p className="w-96 px-12 mt-8">Are you sure you want to install?</p> 
                <p className="w-96 px-12 mb-8">You will be redirected to Caprover to confirm installation, and the app will be added to your Gardens library. 
                </p>
                <div className="flex">
                <a href="" className="mt-4 border border-black hover:bg-gray-50 rounded px-2 py-2">
                Open Caprover
                </a>
                </div>
                    <div 
                    onClick={() => {
                        service.closeModal("installTool")
                    }}
                    className={`w-6 h-6 text-gray-600 cursor-pointer absolute top-0 right-0 mr-4 mt-4`}>
                        <Cross/>
                    </div>
                </div>
            </div>
        </ModalOverlay>
    )
}

export default InstallToolModal