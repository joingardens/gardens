import { useContext } from "react"
import Cross from "../icons/Cross"
import ModalOverlay from "./modalOverlay"
import ModalsContext, { IModals } from "./modalsContext"
import AutosizeInput from 'react-input-autosize';
import NewFlowContext from "../context/newFlow/newFlowContext";
import { useState } from "react";
import Gear from "../icons/Gear";
import Plus from "../icons/Plus";
import NewFlowInputInput from "./newFlow/newFlowInputInput";
import NewFlowStepInput from "./newFlow/newFlowStepInput";
import NewFlowOutputInput from "./newFlow/newFlowOutputInput";
import { useUser } from "../../utils/useUser";


const NewFlowModal = () => {
    const modal: IModals = "newFlow"
    const { state, service } = useContext(ModalsContext)
    const {user} = useUser()
    const { newFlowState, newFlowService, dispatch } = useContext(NewFlowContext)
    const isOpen = state[modal] === true

    return (
        <ModalOverlay modal={modal}>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onMouseUp={(e) => {
                    e.stopPropagation()
                }}
                className={`
        overflow-y-auto max-w-3xl w-full h-full relative z-50 bg-white rounded-lg
        ${isOpen ? "opacity-100 visible scale-100" : "opacity-10 invisible scale-75"}
        transition-all duration-300 transform origin-center
        pb-10 overflow-x-hidden 
        `}>
                <div className={`w-full bg-gray-50 z-30 sticky left-0 h-20 top-0 flex px-4 pr-6 md:px-8 items-center justify-between`}>
                    <div className="w-1/4" />
                    <AutosizeInput
                        value={newFlowState.title}
                        onChange={(e) => {
                            newFlowService.dispatch({ type: "setTitle", payload: e.target.value })
                        }}
                        placeholder="Flow title"
                        inputStyle={{ backgroundColor: "rgb(249, 250, 251)", outline: "none"}}
                        className={`placeholder-gray-700 w-2/4 text-black text-center text-2xl font-bold`}
                    />
                    <div className="w-1/4 text-right">
                    <button
                        onClick={() => {
                            service.closeModal(modal)
                        }}
                        className={`w-6 h-6 text-black opacity-60 hover:opacity-100 transition-all`}>
                        <Cross />
                    </button>
                    </div>
                </div>
                <div className="flex flex-col px-8 md:px-16">
                <div className="mt-6">
                    <div>
                        <div className={`text-lg font-semibold mb-4 w-full text-center`}>Inputs</div>
                        <div className={`grid grid-cols-1 gap-y-4`}>
                            {newFlowState.inputs.map((input, index) => {
                                return <NewFlowInputInput index={index} input={input} />
                            })}
                        </div>
                        <button
                            onClick={() => {
                                newFlowService.addInput()
                            }}
                            className={`w-12 h-12 mt-4 mr-4 p-2 rounded-full bg-gray-100 flex-shrink-0`}>
                            <Plus />
                        </button>
                    </div>
                </div>
                <div>
                    <div className={`text-lg font-semibold mb-4 w-full text-center`}>Current steps</div>
                    <div className={`grid grid-cols-1 gap-y-8`}>
                        {newFlowState.steps.map((step, index) => {
                            return (
                                <NewFlowStepInput step={step} index={index}/>
                            )
                        })}
                    </div>
                    <button
                            onClick={() => {
                                newFlowService.addStep()
                            }}
                            className={`w-12 h-12 mt-4 ml-1  mr-4 p-2 rounded-full bg-gray-100 flex-shrink-0`}>
                            <Plus />
                    </button>
                </div>
                <div className={`flex-col items-center flex`}>
                <div className={`text-lg font-semibold mb-4 w-full text-center `}>Output</div>
                <NewFlowOutputInput/>
                <button onClick={async () => {
                    if (user.id) {
                        await newFlowService.saveFlow(user.id)
                        service.closeModal("newFlow")
                    }
                    }} className={`inline-flex items-center bg-white border border-black py-1 px-3 mt-12 focus:outline-none hover:bg-gray-200 rounded text-base`}>
                    {newFlowState.loading ? "loading..." : "Save input"}
                </button>
                </div>
                </div>
            </div>
        </ModalOverlay>
    )
}

export default NewFlowModal