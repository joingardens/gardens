import { IAction } from "./newFlowReducer"

export class NewFlowService {
    dispatch: React.Dispatch<IAction>
    constructor(dispatch:React.Dispatch<IAction>){
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
}