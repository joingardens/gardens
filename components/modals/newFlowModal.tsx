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


const NewFlowModal = () => {
    const modal: IModals = "newFlow"
    const {state, service} = useContext(ModalsContext)

    const {newFlowState, newFlowService, dispatch} = useContext(NewFlowContext)
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
        transistion-all duration-300 transform origin-center
        pt-24 px-4 md:px-8 pb-10
        `}>
            <div className={`fixed w-full left-0 h-20 top-0 shadow flex px-4 md:px-8 items-center justify-between`}>
                <span className={`hidden md:block`}>New flow</span>
                <AutosizeInput
                value={newFlowState.title}
                onChange={(e) => {
                    newFlowService.dispatch({type: "setTitle", payload: e.target.value})
                }}
                placeholder="Title"
                className={`placeholder-gray-500 text-black text-2xl md:-ml-16 font-bold`}
                />
                <button 
                onClick={() => {
                    service.closeModal(modal)
                }}
                className={`w-6 h-6 text-black opacity-60 hover:opacity-100 transition-all`}>
                    <Cross/>
                </button>
            </div>
            <div>
                <div>
                <div className={`text-lg font-semibold mb-4 w-full text-center`}>Required Inputs (optional)</div>
                <div className={`grid grid-cols-1 gap-y-4`}>
                {newFlowState.inputs.map((input, index) => {
                    return <NewFlowInputInput index={index} input={input}/>
                })}                
                </div>
                <button 
                onClick={() => {
                    newFlowService.addInput()
                }}
                className={`w-12 h-12 mt-4 mr-4 p-2 rounded-full bg-gray-100 flex-shrink-0`}>
                    <Plus/>
                </button>
                </div>
            </div>
        </div>
        </ModalOverlay>
    )
}

export default NewFlowModal