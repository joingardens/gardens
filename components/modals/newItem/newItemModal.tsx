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
                <PrettyBlock key={'new-guide'} smallImage={"https://nbygyyaygsxxesvjjcwa.supabase.in/storage/v1/object/public/public/seedling-line.png"}
      blockLink={'/new-flow'} blockBody={'New Guide'}
      blockDescription={"Show how it's done with a step-by-step guide"} flexibleHeight={true} />
                <PrettyBlock key={'new-post'} smallImage={"https://nbygyyaygsxxesvjjcwa.supabase.in/storage/v1/object/public/public/newspaper-line.png"}
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