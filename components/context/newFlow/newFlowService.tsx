import { SupabaseServiceClass } from "../../../utils/supabase-client"
import { IAction } from "./newFlowReducer"

export class NewFlowService extends SupabaseServiceClass {
    dispatch: React.Dispatch<IAction>
    constructor(dispatch:React.Dispatch<IAction>){
      super()
      console.log("new class")
      this.dispatch = dispatch
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
        .textSearch(field, string)
        return data
    }
    addStep() {
        this.dispatch({type: "addStep"})
    }
    removeStep(index:number) {
        this.dispatch({type: "removeStep", payload: index})
    }
}

