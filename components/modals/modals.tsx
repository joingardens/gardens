import { useContext } from "react"
import NewFlowModal from "./newFlowModal"
import SearchModal from "./search/searchModal"
import NewItemModal from "./newItem/newItemModal"
import InstallToolModal from "./installTool/installToolModal"
import { CookieModal } from "./cookie-modal"

const Modals = () => {
    return (
            <>
            <NewFlowModal/>
            <SearchModal/>
            <NewItemModal/>
            <InstallToolModal/>
            <CookieModal/>
            </>
    )
}

export default Modals