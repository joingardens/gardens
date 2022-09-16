import { useContext } from "react"
import NewFlowModal from "./newFlowModal"
import SearchModal from "./search/searchModal"
import NewItemModal from "./newItem/newItemModal"
import InstallToolModal from "./installTool/installToolModal"

const Modals = () => {
    return (
            <>
            <NewFlowModal/>
            <SearchModal/>
            <NewItemModal/>
            <InstallToolModal/>
            </>
    )
}

export default Modals