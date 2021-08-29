import { useEffect, useState } from "react"
import { useContext } from "react"
import AutosizeInput from "react-input-autosize"
import NewFlowContext from "../../context/newFlow/newFlowContext"
import useDebounce from "../../hooks/useDebounce"

const NewFlowOutputInput = () => {
    const {newFlowState, newFlowService} = useContext(NewFlowContext)
    const [outputDropdownState, setOutputDropdownState] = useState({
        isOpen: false,
        items: [],
        loading: false
    })
    const debouncedOutput = useDebounce(newFlowState.output, 1000)
    const getOutputs = async () => {
        const data = await newFlowService.findEntityByString("outputs", "output", newFlowState.output)
        setOutputDropdownState({
            ...outputDropdownState,
            items: data,
            loading: false
        })
    }
    useEffect(() => {
        setOutputDropdownState({
            ...outputDropdownState,
            loading: true
        })
    },[newFlowState.output])

    useEffect(() => {
        getOutputs()
    },[debouncedOutput])

    return (
        <div className={`flex justify-center w-full`}>
            <div className={`relative`}>
            <AutosizeInput 
            inputClassName={`border-none max-w-full`}
            className={` px-3 ml-3 border py-1 rounded-md text-2xl`}
            onFocus={() => {
                setOutputDropdownState({
                    ...outputDropdownState,
                    isOpen: true
                })
            }}
            onSubmit={() => {
                setOutputDropdownState({
                    ...outputDropdownState,
                    isOpen: false
                })
            }}  
            value={newFlowState.output} 
            onChange={(e) => {newFlowService.setOutput(e.target.value)}}
            placeholderIsMinWidth 
            placeholder={`And final result is...`}/>
                <div className={`absolute left-3 bottom-0 z-20`}>
                    <div className={`absolute ${outputDropdownState.isOpen && newFlowState.output ? "opacity-100 scale-100 visible" : "opacity-0 scale-75 invisible"} rounded-md overflow-y-auto transform origin-top-left w-60 top-1 left-0 max-h-32 shadow-md bg-white  transition-all duration-300 `}>
                            {outputDropdownState.loading ? <div className={`px-2 py-2`}>...loading</div> : outputDropdownState.items
                            && outputDropdownState.items.map(suggestion => {
                                return <button 
                                onClick={() => {
                                    setOutputDropdownState({
                                    ...outputDropdownState,
                                    isOpen: false
                                }); 
                                newFlowService.setOutput(suggestion.output)
                            }} className={`px-2 py-2 w-full text-left hover:bg-blue-100 focus:bg-blue-100  transition-all`}>{suggestion.output}</button>
                            })}
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default NewFlowOutputInput