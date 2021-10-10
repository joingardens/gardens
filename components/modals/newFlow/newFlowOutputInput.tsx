import { useEffect, useMemo, useState } from "react"
import { useContext } from "react"
import AutosizeInput from "react-input-autosize"
import NewFlowContext from "../../context/newFlow/newFlowContext"
import useDebounce from "../../hooks/useDebounce"
import TextareaAutosize from 'react-textarea-autosize';
import ImageInput from "../../ui/ImageInput"
import ImageMap from "../../ui/ImageMap"

const NewFlowOutputInput = () => {
    const {newFlowState, newFlowService} = useContext(NewFlowContext)
    const [outputDropdownState, setOutputDropdownState] = useState({
        isOpen: false,
        items: [],
        loading: false
    })
    const debouncedOutput = useDebounce(newFlowState.output, 1000)
    const getOutputs = async () => {
        const data = await newFlowService.findEntityByString("outputs", "output", newFlowState.output.output)
        setOutputDropdownState({
            ...outputDropdownState,
            items: data,
            loading: false
        })
    }
    const [images, setImages] = useState<File[]>([])
    useEffect(() => {
        setOutputDropdownState({
            ...outputDropdownState,
            loading: true
        })
    },[newFlowState.output.output])

    useEffect(() => {
        console.log(images)
    }, [images])

    useEffect(() => {
        getOutputs()
    },[debouncedOutput])

    return (
        <div className={`flex justify-center w-full`}>
            <div className={`relative w-full flex flex-col `}>
                <div className={`relative`}>
                <AutosizeInput 
            inputClassName={`border-none max-w-full`}
            className={` px-3 border py-1 rounded-md text-2xl bg-gray-50`}
            inputStyle={{ backgroundColor: "rgb(249, 250, 251)", outline: "none"}}
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
            value={newFlowState.output.output} 
            onChange={(e) => {newFlowService.setOutputOutput(e.target.value)}}
            placeholderIsMinWidth 
            placeholder={`And final result is...`}/>
                <div className={`absolute top-10 z-20 transform left-3`}>
                    <div className={`absolute ${outputDropdownState.isOpen && newFlowState.output.output ? "opacity-100 scale-100 visible" : "opacity-0 scale-75 invisible"} rounded-md overflow-y-auto transform origin-top-left w-60 top-1 left-0 max-h-32 shadow-md bg-white  transition-all duration-300 `}>
                            {outputDropdownState.loading ? <div className={`px-2 py-2`}>...loading</div> : outputDropdownState.items
                            && outputDropdownState.items.map(suggestion => {
                                return <button 
                                onClick={() => {
                                    setOutputDropdownState({
                                    ...outputDropdownState,
                                    isOpen: false
                                }); 
                                newFlowService.setOutputOutput(suggestion.output)
                            }} className={`px-2 py-2 w-full text-left hover:bg-blue-100 focus:bg-blue-100  transition-all`}>{suggestion.output}</button>
                            })}
                    </div>
                </div>
                </div>
                <div className={`w-full border mr-3 bg-gray-50 rounded-md mt-3 py-2`}>
                    <TextareaAutosize
                        value={newFlowState.output.description}
                        onChange={(e) => {newFlowService.setOutputDescription(e.target.value)}}
                        autoComplete={"off"}
                        className={`px-4 h-full rounded-md max-w-full bg-gray-50 w-full resize-none overflow-y-hidden focus:border-transparent`}
                        placeholder={"All the good stuff you can find in your fridge"}
                        minRows={3}
                    />
                </div>
                <div className={`flex flex-wrap mt-6`}>
                    {useMemo(() => {
                        return  <>
                    <ImageMap images={newFlowState.output.images} setState={newFlowService.setOutputImages.bind(newFlowService)}/>
                    <ImageInput state={newFlowState.output.images} setState={newFlowService.setOutputImages.bind(newFlowService)}/>
                    </>
                    
                    }, [newFlowState.output.images])}
                    
                </div>
            </div> 
        </div>
    )
}

export default NewFlowOutputInput