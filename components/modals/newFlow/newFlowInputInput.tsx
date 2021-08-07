import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import AutosizeInput from "react-input-autosize"
import { findInputsByString } from "../../../utils/supabase-client"
import NewFlowContext, { IInput } from "../../context/newFlow/newFlowContext"
import useDebounce from "../../hooks/useDebounce"
import Cross from "../../icons/Cross"
import Gear from "../../icons/Gear"

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
    const debouncedValue = useDebounce(input.name, 1000)

    const find = async () => {
        setLoading(true)
        const data =  await findInputsByString(input.name)
        setSuggestions(data) 
        console.log(data)
        setLoading(false)
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (input.name) {
            setLoading(true)
        }
    }, [input.name])

    useEffect(() => {
        if (debouncedValue && isOpen) {
            find()
        }
    }, [debouncedValue, isOpen])
    return (
        <div 
        className={`flex items-center transition-all duration-300 ${mounted ? "max-h-32 opacity-100" : "max-h-0 opacity-20"}`}>
        <div className={`w-12 h-12 mr-4 p-2 rounded-full bg-gray-100 flex-shrink-0`}>
            <Gear/>
        </div>
        <div>
            <AutosizeInput
            onFocus={() => {
                setIsOpen(true)
            }}
            onSubmit={() => {
                setIsOpen(false)
            }}
            autoFocus
            value={input.name}
            onChange={(e) => {newFlowService.setInput(e.target.value, index)}}
            autoComplete={"off"}
            inputClassName={`border-none`}
            placeholder="Start typing here"
            className={` px-3 mr-3 border py-1 rounded-md `}
            type="text" />
            <div className={`relative`}>
                <div className={`absolute ${isOpen && input.name ? "opacity-100 scale-100 visible" : "opacity-0 scale-75 invisible"} rounded-md overflow-y-auto transform origin-top-left w-40 top-1 left-0 max-h-20 shadow-md bg-white  transition-all duration-300 `}>
                    {loading ? <div className={`px-2 py-2`}>...loading</div> : suggestion && suggestion.map(suggestion => {
                        return <button onClick={() => {setIsOpen(false);newFlowService.setInput(suggestion.input, index)}} className={`px-2 py-2 w-full text-left hover:bg-blue-100 focus:bg-blue-100  transition-all`}>{suggestion.input}</button>
                    })}
                </div>
            </div>
        </div>
        <button 
        onClick={() => {

            newFlowService.removeInput(index)}}
        className={`w-6 h-6 text-red-600 opacity-60 F:opacity-100`}>
            <Cross/>
        </button>
    </div>
    )
}

export default NewFlowInputInput