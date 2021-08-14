import { defaultNewFlowInput, defaultNewStep, INewFlowState } from "./newFlowContext";

export type Reducer<S, A> = (prevState: S, action: A) => S;
export type IAction = 
{type: "setTitle", payload: string} |
{type: "addInput"} |
{type: "setInput", payload: {index: number, name: string}} |
{type: "removeInput", payload: number} |
{type: "setStepTask", payload: {index: number, task: string}} |
{type: "setStepTool", payload: {index: number, tool: string}} |
{type: "addStep"} |
{type: "removeStep", payload: number}

export const NewFlowReducer: Reducer<INewFlowState, IAction> = (state, action: IAction) => {

    if (action.type === "setTitle") {
        return {
            ...state,
            title: action.payload
        }
    }
    if (action.type === "setInput") {
        return {
            ...state,
            inputs: state.inputs.map((input, index) => {
                if (index === action.payload.index) {
                    console.log(index)
                    return {
                        ...input,
                        name: action.payload.name
                    }
                }
                return input
            }),

        }
    }
    if (action.type === "addInput") {
        return {
            ...state,
            inputs: [...state.inputs, defaultNewFlowInput]
        }
    }
    if (action.type === "removeInput") {
        return {
            ...state,
            inputs: state.inputs.filter((_input, index) => (index !== action.payload))
        }
    }
    if (action.type === "setStepTask") {
        return {
            ...state,
            steps: state.steps.map((step, index) => {
                if (index !== action.payload.index) {
                    return step
                }
                return {
                    ...step,
                    task: action.payload.task
                }
            })
        }
    }
    if (action.type === "setStepTool") {
        return {
            ...state,
            steps: state.steps.map((step, index) => {
                if (index !== action.payload.index) {
                    return step
                }
                return {
                    ...step,
                    tool: action.payload.tool
                }
            })
        }
    }
    if (action.type === "addStep") {
        return {
            ...state,
            steps: [...state.steps, defaultNewStep]
        }
    }
    if (action.type === "removeStep") {
        return {
            ...state,
            steps: state.steps.filter((_input, index) => (index !== action.payload))
        }
    }

}

export default NewFlowReducer