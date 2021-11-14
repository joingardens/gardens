import { useContext } from "react"
import Cross from "../../icons/Cross"
import ModalOverlay from "../modalOverlay"
import ModalsContext from "../modalsContext"
import PrettyBlock from '../../../components/ui/PrettyBlock';

const NewItemModal = () => {

    const {state, service} = useContext(ModalsContext)

    const isOpen = state["newItem"]

    
    return (
        <ModalOverlay modal={"newItem"}>
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
                <PrettyBlock key={'new-guide'} smallImage={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0H24V24H0z'/%3E%3Cpath d='M6 3c3.49 0 6.383 2.554 6.913 5.895C14.088 7.724 15.71 7 17.5 7H22v2.5c0 3.59-2.91 6.5-6.5 6.5H13v5h-2v-8H9c-3.866 0-7-3.134-7-7V3h4zm14 6h-2.5c-2.485 0-4.5 2.015-4.5 4.5v.5h2.5c2.485 0 4.5-2.015 4.5-4.5V9zM6 5H4v1c0 2.761 2.239 5 5 5h2v-1c0-2.761-2.239-5-5-5z' fill='rgba(75,85,99,1)'/%3E%3C/svg%3E`}
      blockLink={'/new-flow'} blockBody={'New Guide'}
      blockDescription={"Show how it's done with a step-by-step guide"} flexibleHeight={true} />
                <PrettyBlock key={'new-post'} smallImage={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M16 20V4H4v15a1 1 0 0 0 1 1h11zm3 2H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7h4v9a3 3 0 0 1-3 3zm-1-10v7a1 1 0 0 0 2 0v-7h-2zM6 6h6v6H6V6zm2 2v2h2V8H8zm-2 5h8v2H6v-2zm0 3h8v2H6v-2z' fill='rgba(75,85,99,1)'/%3E%3C/svg%3E`}
      blockLink={'/drafts'} blockBody={'New Draft'}
      blockDescription={'Share opinions, thoughts, or just a snippet of text'} flexibleHeight={true} />
                    <div 
                    onClick={() => {
                        service.closeModal("newItem")
                    }}
                    className={`w-6 h-6 text-gray-600 cursor-pointer absolute top-0 right-0 mr-4 mt-4`}>
                        <Cross/>
                    </div>
                </div>
            </div>
        </ModalOverlay>
    )
}

export default NewItemModal