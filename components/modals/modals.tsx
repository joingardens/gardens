import { useContext } from "react"
import NewFlowModal from "./newFlowModal"
import SearchModal from "./search/searchModal"
import NewItemModal from "./newItem/newItemModal"

const Modals = () => {
    return (
            <>
            <NewFlowModal/>
            <SearchModal/>
            <NewItemModal/>
            </>
    )
}

export default Modals