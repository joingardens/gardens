import { useEffect } from "react"
import { useContext, useState } from "react"
import AutosizeInput from "react-input-autosize"
import NewFlowContext, { IInput } from "../../context/newFlow/newFlowContext"
import Cross from "../../icons/Cross"
import useDebounce from "../../hooks/useDebounce"
import TextareaAutosize from 'react-textarea-autosize';
import ImageMap from "../../ui/ImageMap"
import ImageInput from "../../ui/ImageInput"

const NewFlowStepInput = ({index, step}) => {
    const { newFlowService, newFlowState} = useContext(NewFlowContext)
    const [mounted, setMounted] = useState(false)
    const [taskDropdownState, setTaskDropdownState] = useState({
        loading: false,
        suggestions: [],
        isOpen: false
    })
    const [toolDropdownState, setToolDropdownState] = useState({
        loading: false,
        tools: [],
        isOpen: false
    })
    const debounceTool = useDebounce(step.tool, 1000)
    const debounceTask = useDebounce(step.task, 1000)

    const setStepImages = (images: File[]) => {
        return newFlowService.setStepImages(index, images)
    }

    const findSuggestions = async () => {

       const data =  await newFlowService.findEntityByString("jobs", "job", step.task)
       setTaskDropdownState({
           ...taskDropdownState,
           suggestions: data,
           loading: false
       })
       console.log(data)
    }

    const findTools = async () => {
        const data = await newFlowService.findEntityByString("tools", "tool", step.tool)
        setToolDropdownState({
            ...toolDropdownState,
            tools: data,
            loading:false
        })
    }

    useEffect(() => {
        setToolDropdownState({
            ...toolDropdownState,
            loading: true,
        })
        findTools()
    }, [debounceTool])

    useEffect(() => {

        findSuggestions()
        setMounted(true)
    }, [debounceTask])

    useEffect(() => {
        setTaskDropdownState({
            ...taskDropdownState,
            loading: true
        })
    }, [step.task])

    useEffect(() => {
        setToolDropdownState({
            ...toolDropdownState,
            loading: true
        })
    }, [step.tool])

    return (
        <div className={`flex items-center -m-2 transition-all ${mounted ? "max-h-full opacity-100" : "max-h-0 opacity-20"}`}>
            <div className={`h-full flex `}>
                <div className={`w-12 h-12 mr-4 p-2 m-3 flex text-2xl font-bold rounded-full items-center justify-center bg-gray-100 flex-shrink-0`}>
            {index + 1}
                </div>
            </div>
            <div className={`flex flex-wrap`}>
                <div className={`m-2 relative`}>
                    <AutosizeInput
                    onFocus={() => {
                        setTaskDropdownState({
                            ...taskDropdownState,
                            isOpen: true
                        })
                    }}
                    onSubmit={() => {
                        setTaskDropdownState({
                            ...taskDropdownState,
                            isOpen: false
                        })
                    }}
                    value={step.task}
                    onChange={(e) => {newFlowService.setStepTask(e.target.value, index)}}
                    placeholder={"Get this task done"}
                    inputClassName={`border-none max-w-full`}
                    inputStyle={{ backgroundColor: "rgb(249, 250, 251)", outline: "none"}}
                    className={` px-3  border py-1 rounded-md  max-w-full bg-gray-50`}
                    />
                    <div className={`absolute left-0 bottom-0 z-20`}>
                            <div className={`absolute ${taskDropdownState.isOpen && step.task ? "opacity-100 scale-100 visible" : "opacity-0 scale-75 invisible"} rounded-md overflow-y-auto transform origin-top-left w-60 top-1 left-0 max-h-32 shadow-md bg-white  transition-all duration-300 `}>
                                {taskDropdownState.loading ? <div className={`px-2 py-2`}>...loading</div> : taskDropdownState.suggestions 
                                && taskDropdownState.suggestions.map(suggestion => {
                                    return <button 
                                    onClick={() => {
                                        setTaskDropdownState({
                                        ...taskDropdownState,
                                        isOpen: false
                                    }); 
                                    newFlowService.setStepTask(suggestion.job, index)
                                }} className={`px-2 py-2 w-full text-left hover:bg-blue-100 focus:bg-blue-100  transition-all`}>{suggestion.job}</button>
                                })}
                            </div>
                    </div>
                </div>

            <span className={`m-4`}>
            {"with"}
            </span>
            <div className={`relative `}>
            <AutosizeInput
            onFocus={() => {
                setToolDropdownState({
                    ...toolDropdownState,
                    isOpen: true
                })
                }}
            onSubmit={() => {
                setToolDropdownState({
                    ...toolDropdownState,
                    isOpen: false
                    })
                }}
            value={step.tool}
            onChange={(e) => {newFlowService.setStepTool(e.target.value, index)}}
            placeholder={"This tool"}
            inputStyle={{ backgroundColor: "rgb(249, 250, 251)", outline: "none"}}
            inputClassName={`border-none max-w-full`}
            style={{
                maxWidth: "90%"
            }}
            className={` px-3 ml-3 border py-1 rounded-md m-2 bg-gray-50`}
            />
                        <div className={`absolute left-3 bottom-0 z-20`}>
                        <div className={`absolute ${toolDropdownState.isOpen && step.tool ? "opacity-100 scale-100 visible" : "opacity-0 scale-75 invisible"} rounded-md overflow-y-auto transform origin-top-left w-60 top-1 left-0 max-h-32 shadow-md bg-white  transition-all duration-300 `}>
                            {toolDropdownState.loading ? <div className={`px-2 py-2`}>...loading</div> : toolDropdownState.tools
                            && toolDropdownState.tools.map(suggestion => {
                                return <button 
                                onClick={() => {
                                    setToolDropdownState({
                                    ...toolDropdownState,
                                    isOpen: false
                                }); 
                                newFlowService.setStepTool(suggestion.tool, index)
                            }} className={`px-2 py-2 w-full text-left hover:bg-blue-100 focus:bg-blue-100  transition-all`}>{suggestion.tool}</button>
                            })}
                        </div>
                </div>
            </div>

                        <button 
            onClick={() => {
                newFlowService.removeStep(index)
            }}
            className={`w-6 h-6 text-red-600 opacity-60 hover:opacity-100 m-2 transition-all`}>
                <Cross/>
            </button>
            <div className={`w-full border mr-3 bg-gray-50 rounded-md ml-2 py-2`}>
                <TextareaAutosize
                    value={step.description}
                    onChange={(e) => {newFlowService.setStepDescription(e.target.value,index)}}
                    autoComplete={"off"}
                    className={`px-4 h-full rounded-md max-w-full bg-gray-50 w-full resize-none overflow-y-hidden focus:border-transparent`}
                    placeholder={"Description!"}
                    minRows={3}
                />
            </div>
            <div className={`mt-4 grid lg:grid-cols-3 grid-cols-2 gap-4`}>
                    <ImageMap images={newFlowState.steps[index].images} setState={setStepImages}/>
                    <ImageInput state={newFlowState.steps[index].images} setState={setStepImages}/>
            </div>
            </div>


    </div>
    )
}

export default NewFlowStepInput