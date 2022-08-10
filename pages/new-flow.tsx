import { useContext } from "react"
import AutosizeInput from "react-input-autosize"
import NewFlowContext from "../components/context/newFlow/newFlowContext"
import Plus from "../components/icons/Plus"
import ModalsContext from "../components/modals/modalsContext"
import NewFlowInputInput from "../components/modals/newFlow/newFlowInputInput"
import NewFlowOutputInput from "../components/modals/newFlow/newFlowOutputInput"
import NewFlowStepInput from "../components/modals/newFlow/newFlowStepInput"
import { useUser } from "../utils/useUser"

const newFlow = () => {
    const { state, service } = useContext(ModalsContext)
    const {user} = useUser()
    const { newFlowState, newFlowService, dispatch } = useContext(NewFlowContext)
    return (
        <div className={`w-full`}>
                        <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onMouseUp={(e) => {
                    e.stopPropagation()
                }}
                className={`
        overflow-y-hidden w-full md:w-2/3 mx-auto h-full relative bg-white rounded-lg opacity-100 visible scale-100
        transition-all duration-300 transform origin-center
        pb-10 overflow-x-hidden 
        `}>
                <div className={`w-full mt-4 px-8 md:px-16 z-30 sticky left-0 h-20 top-0 flex px-4 pr-6 md:px-8 items-center `}>
                    <div />
                    <AutosizeInput
                        value={newFlowState.title}
                        onChange={(e) => {
                            newFlowService.dispatch({ type: "setTitle", payload: e.target.value })
                        }}
                        inputStyle={{ backgroundColor: "#fff", outline: "none", fontWeight: "bold"}}
                        className={`text-black text-center text-2xl font-bold`}
                    />
                </div>
                <div className="flex flex-col px-8 md:px-16">
                <div className="mt-4">
                    <div>
                        <div className={`text-lg font-semibold mb-4 w-full text-left ml-1`}>Inputs required</div>
                        <div className={`grid grid-cols-1 gap-y-4`}>
                            {newFlowState.inputs.map((input, index) => {
                                return <NewFlowInputInput index={index} input={input} />
                            })}
                        </div>
                        <button
                            onClick={() => {
                                newFlowService.addInput()
                            }}
                            className={`bg-white border bg-gray-50 py-1 px-3 ml-3 my-4 focus:outline-none hover:bg-gray-200 rounded text-gray-500`}>
                            + New input
                        </button>
                    </div>
                </div>
                <div className="mt-8">
                    <div className={`text-lg font-semibold mb-8 w-full  text-left ml-1`}>Instruction steps</div>
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
                            className={`bg-white border bg-gray-50 py-1 px-3 ml-3 my-4 focus:outline-none hover:bg-gray-200 rounded text-gray-500`}>
                            + New step
                        </button>
                </div>
                <div className={`flex-col items-center flex mt-8`}>
                <div className={`text-lg font-semibold mb-4 w-full  text-left ml-1`}>End result</div>
                <NewFlowOutputInput/>
                <div className="flex mt-12">
                    <input checked={newFlowState.isPrivate} onClick={() => {newFlowService.setChecked(!newFlowState.isPrivate)}} type="checkbox"/>
                    <span className="ml-2">Make private?</span>
                </div>
                <button onClick={async () => {
                    if (user.id) {
                        await newFlowService.saveFlow(user.id)
                        //service.closeModal("newFlow")
                    }
                    }} className={`inline-flex items-center bg-white border border-black py-1 px-3 mt-4 focus:outline-none hover:bg-gray-200 rounded text-base`}>
                    {newFlowState.loading ? "loading..." : "Publish guide"}
                </button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default newFlow