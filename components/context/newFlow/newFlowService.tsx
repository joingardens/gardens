import { SupabaseServiceClass } from "../../../utils/supabase-client"
import { IInput, INewFlowState, IStep } from "./newFlowContext"
import { IAction } from "./newFlowReducer"

class CDebouncer{
    private timeout: NodeJS.Timeout
    constructor() {

    }
    debounce(fn, wait:number) {
        clearTimeout(this.timeout)
        console.log(this.timeout)
        this.timeout = setTimeout(fn, wait)
    }
}

export const searchDebouncer = new CDebouncer()

export class NewFlowService extends SupabaseServiceClass {
    dispatch: React.Dispatch<IAction>
    state: INewFlowState
    constructor(state: INewFlowState , dispatch:React.Dispatch<IAction>){
      super()
      this.dispatch = dispatch
      this.state = state
    }
    setTitle(title: string){
        this.dispatch({type: "setTitle", payload: title})
    }
    setInput(name:string, index:number) {
        this.dispatch({type: "setInput", payload: {name, index}})
    }
    addInput() {
        this.dispatch({type: "addInput"})
    }
    removeInput(index:number) {
        this.dispatch({type: "removeInput", payload: index})
    }
    setStepTask(task: string, index: number) {
        this.dispatch({type: "setStepTask", payload: {task, index}})
    }
    setStepTool(tool: string, index: number) {
        this.dispatch({type: "setStepTool", payload: {tool, index}})
    }
    async findEntityByString(entity:string, field:string, string:string) {
        const {data} = await this.supabase
        .from(entity)
        .select("*")
        .textSearch(field, string.split(" ").join(" & "))
        return data
    }
    addStep() {
        this.dispatch({type: "addStep"})
    }
    removeStep(index:number) {
        this.dispatch({type: "removeStep", payload: index})
    }
    setOutput(value: string) {
        this.dispatch({type: "setOutput", payload: value})
    }

    validateInputs(inputs: IInput[]) {
        let result = inputs.filter(a => a.name.length > 0)
        return result
    }
    validateSteps(steps: IStep[]) {
        let result = steps.filter(a => a.task.length > 0)
        return result
    }
    validateOutput(output: string) {
        let result = output.length > 0 ? output : false
        return result
    }

    async findInput(input: IInput){
        const data = await this.findEntityByString("inputs", "input", input.name)
        if (data.length === 0) {
            return input
        }
        return data[0]
    }

    async findStep(step: IStep) {
        let result = step
        const taskData = await this.findEntityByString("jobs", "job", result.task)
    }

    async saveFlow() {
        const validatedInputs = this.validateInputs(this.state.inputs)
        const validatedSteps = this.validateSteps(this.state.steps)
        const validatedOutput = this.validateOutput(this.state.output)
        let errors = []
        if (!validatedSteps.length) {
            errors.push("steps")
        }
        if (!validatedOutput) {
            errors.push("output")
        }
        
        if (errors.length) {
            return
        }

        let foundInputs = []
        for (let item of validatedInputs) {
            const result = await this.findInput(item)
            foundInputs.push(result)
        }
        for (let item of validatedSteps) {
            const result = await this.findInput(item)
            foundInputs.push(result)
        }
        console.log(foundInputs)


    }
}

