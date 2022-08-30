import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import AutosizeInput from "react-input-autosize"
import { findInputsByString } from "../../../utils/supabase-client"
import NewFlowContext, { IInput } from "../../context/newFlow/newFlowContext"
import useDebounce from "../../hooks/useDebounce"
import Cross from "../../icons/Cross"
import Gear from "../../icons/Gear"
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
    index: number,
    input: IInput
}

const NewFlowInputInput = ({input, index}: Props) => {
    const {newFlowService} = useContext(NewFlowContext)
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [suggestion, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    const debouncedValue = useDebounce(input.input, 1000)

    const find = async () => {
        setLoading(true)
        const data =  await newFlowService.findEntityByString("inputs", "input", input.input)
        setSuggestions(data) 
        setLoading(false)
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (input.input) {
            setLoading(true)
        }
    }, [input.input])

    useEffect(() => {
        if (debouncedValue && isOpen) {
            find()
        }
    }, [debouncedValue, isOpen])
    return (
        <div 
        className={`flex items-center transition-all max-w-full w-full duration-300 ${mounted ? "max-h-full opacity-100  bg-gray-50" : "max-h-0 opacity-20"}`}>
        {/*<div className={`w-12 h-12 mr-4 p-2 hidden md:block rounded-full bg-gray-100 flex-shrink-0 m-2`}>
            <Gear/>
        </div>
        */}
        <div className={`m-2 flex items-center relative w-full`}>
            <div className="flex flex-col flex-wrap w-full">
            <div className="flex w-full">
            <div className="flex flex-col w-full">
            <div className="mb-1 mt-1 px-4 w-full">
                    <span className="text-gray-500">
                    {'Input #' + (index + 1)}
                    </span>
            </div>
            <div className="flex justify-between w-full pr-1">
            <input
            onFocus={() => {
                setIsOpen(true)
            }}
            onSubmit={() => {
                setIsOpen(false)
            }}
            autoFocus
            value={input.input}
            onChange={(e) => {newFlowService.setInputInput(e.target.value, index)}}
            autoComplete={"off"}
            placeholder="Brand assets"
            className={`px-4 mr-3 py-2 rounded-md w-full bg-gray-50`}
            type="text" />
            <div className={`absolute left-0 z-20 top-16`}>
                <div className={`absolute ${isOpen && input.input ? "opacity-100 scale-100 visible" : "opacity-0 scale-75 invisible"} rounded-md overflow-y-auto transform origin-top-left w-40 top-1 left-0 max-h-20 shadow-md bg-white  transition-all duration-300 `}>
                    {loading ? <div className={`px-2 py-2`}>...loading</div> : suggestion && suggestion.map(suggestion => {
                        return <button onClick={() => {setIsOpen(false); 
                            newFlowService.setInputInput(suggestion.input, index); 
                            newFlowService.setInputDescription(suggestion.description, index) }} className={`px-2 py-2 w-full text-left hover:bg-blue-100 focus:bg-blue-100  transition-all`}>
                            {suggestion.input}
                            </button>
                    })}
                </div>
            </div>
            </div>
            </div>
            <button 
        onClick={() => {
            newFlowService.removeInput(index)
        }}
        className={`w-5 h-5 text-gray-600 mr-2 mt-2 opacity-60 hover:opacity-100`}>
            <Cross/>
        </button>
            </div>
        <div className={`w-full bg-gray-50 rounded-md mt-2 pb-2 pt-2`}>
        <div className="mb-1 px-4 w-full">
                    <span className="text-gray-500">
                    Description 
                    </span>
            </div>
            <TextareaAutosize
                value={input.description}
                onChange={(e) => {newFlowService.setInputDescription(e.target.value,index)}}
                autoComplete={"off"}
                className={`px-4 h-full mt-2 rounded-md max-w-full bg-gray-50 w-full resize-none overflow-y-hidden focus:border-transparent`}
                placeholder={"Visuals, fonts, colors. Everything you need to design something"}
                minRows={3}
            />
        </div>
        </div>
        </div>
    </div>
    )
}

export default NewFlowInputInput