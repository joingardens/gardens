import { useEffect, useMemo } from "react"
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
    const [imagesEnabled, setImagesEnabled] = useState(false)
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

    const handleImagesEnabled = () => {
        setImagesEnabled(!imagesEnabled);
    }

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
            <div className={`flex flex-wrap`}>
            <div className="w-full flex justify-between items-center ml-2 mb-2">
            <span className="font-semibold text-gray-900">
            {'Step ' + (index + 1)}
            </span>
            <button 
            onClick={() => {
                newFlowService.removeStep(index)
            }}
            className={`w-5 h-5 text-red-600 opacity-60 hover:opacity-100 m-2 transition-all`}>
                <Cross/>
            </button>
            </div>
                <div className={`ml-2 mt-2 mb-1 w-full`}>
                    <div className="mb-1 w-full">
                    <span className="text-gray-500">
                    Task
                    </span>
                    </div>
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
                    placeholder={"Create a web page"}
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
            <div className={`ml-2 mt-1 mb-1 w-full`}>
            <div className="mb-1 w-full">
            <span className="text-gray-500">
            Tool
            </span>
            </div>
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
            placeholder={"Wordpress"}
            inputStyle={{ backgroundColor: "rgb(249, 250, 251)", outline: "none"}}
            inputClassName={`border-none max-w-full`}
            className={` px-3 border py-1 rounded-md bg-gray-50`}
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
            {imagesEnabled ? (
                <div className={`mt-2 flex flex-wrap justify-between`}>
                <ImageMap images={newFlowState.steps[index].images} setState={setStepImages}/>
                <ImageInput state={newFlowState.steps[index].images} setState={setStepImages}/>
                    
            {/*useMemo(() => {
                        return  <>
                     <ImageMap images={newFlowState.steps[index].images} setState={setStepImages}/>
                    <ImageInput state={newFlowState.steps[index].images} setState={setStepImages}/>
                    </>
                    
            }, [newFlowState.steps[index].images])
        */}

            </div>) : (
            <div>
            <button onClick={handleImagesEnabled} className={`inline-flex items-center bg-white border border-gray-500 py-1 px-3 ml-2 my-4 focus:outline-none hover:bg-gray-200 rounded text-gray-500`}>
                + Add images
            </button>
            </div>)}
            <div className={`w-full border mr-3 bg-gray-50 rounded-md ml-2 py-2`}>
                <TextareaAutosize
                    value={step.description}
                    onChange={(e) => {newFlowService.setStepDescription(e.target.value,index)}}
                    autoComplete={"off"}
                    className={`px-4 h-full rounded-md max-w-full bg-gray-50 w-full resize-none overflow-y-hidden focus:border-transparent`}
                    placeholder={"To create a page in Wordpress, do this..."}
                    minRows={3}
                />
            </div>
            </div>
    </div>
    )
}

export default NewFlowStepInput