import { defaultNewFlowInput, defaultNewStep, INewFlowState, IOutput } from "./newFlowContext";

export type Reducer<S, A> = (prevState: S, action: A) => S;
export type IAction = 
{type: "setTitle", payload: string} |
{type: "addInput"} |
{type: "setInput", payload: {index: number, name: string}} |
{type: "removeInput", payload: number} |
{type: "setStepTask", payload: {index: number, task: string}} |
{type: "setStepTool", payload: {index: number, tool: string}} |
{type: "addStep"} |
{type: "removeStep", payload: number} |
{type: "setOutput", payload: IOutput} |
{type: "setInputInput", payload: {index: number, input: string}} |
{type: 'setInputDescription', payload: {index: number, description: string}} |
{type: "setOutputOutput", payload: string} |
{type: "setOutputDescription", payload: string} |
{type: "setStepDescription", payload: {index: number, description: string}} |
{type: "setOutputImages", payload: File[]} |
{type: "setStepImages", payload: {index:number, images: File[]}} |
{type: "setLoading", payload: boolean} |
{type: "setErrors", payload: string[]}

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
    if (action.type === "setOutput") {
        return {
            ...state,
            output: action.payload
        }
    }
    if (action.type === "setInputInput") {
        return {
            ...state,
            inputs: state.inputs.map((input, index) => {
                if (index !== action.payload.index) {
                    return input
                }
                return {
                    ...input,
                    input: action.payload.input
                }
            })
        }
    }
    if (action.type === "setInputDescription") {
        return {
            ...state,
            inputs: state.inputs.map((input, index) => {
                if (index !== action.payload.index) {
                    return input
                }
                return {
                    ...input,
                    description: action.payload.description
                }
            })
        }
    }
    if (action.type === "setOutputOutput") {
        return {
            ...state,
            output: {
                ...state.output,
                output: action.payload
            }
        }
    }
    if (action.type === "setOutputDescription") {
        return {
            ...state,
            output: {
                ...state.output,
                description: action.payload
            }
        }
    }
    if (action.type === "setStepDescription") {
        return {
            ...state,
            steps: state.steps.map((step, index) => {
                if (index !== action.payload.index) {
                    return step
                }
                return {
                    ...step,
                    description: action.payload.description
                }
            })
        }
    }
    if (action.type === "setOutputImages") {
        return {
            ...state,
            output: {
                ...state.output,
                images: action.payload
            }
        }
    }
    if (action.type === "setStepImages") {
        return {
            ...state,
            steps: state.steps.map((step, index) => {
                if (index !== action.payload.index) {
                    return step
                }
                return {
                    ...step,
                    images: action.payload.images
                }
            })
        }
    }
    if (action.type === "setLoading") {
        return {
            ...state,
            loading: action.payload
        }
    }
    if (action.type === "setErrors") {
        return {
            ...state,
            errors: action.payload
        }
    }
    

}

export default NewFlowReducer