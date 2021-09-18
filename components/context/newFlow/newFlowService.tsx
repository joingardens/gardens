import { SupabaseServiceClass } from "../../../utils/supabase-client"
import { IInput, INewFlowState, IStep, IOutput } from "./newFlowContext"
import { IAction } from "./newFlowReducer"
import { v4 as uuidv4 } from 'uuid';
import image from "next/image";

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
    setInputInput(input:string, index: number) {
        return this.dispatch({type: "setInputInput", payload: {index, input}})
    }
    setInputDescription(description: string, index: number) {
        return this.dispatch({type: "setInputDescription", payload: {index, description}})
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
    setOutputImages(images: File[]) {
        this.dispatch({type: "setOutputImages", payload: images})
    }
    setStepImages(index:number, images: File[]) {
        this.dispatch({type: "setStepImages", payload: {index, images}})
    }
    async insertItem(from:string,entities: any[] ){
        const {data} = await this.supabase.from(from).insert(entities)
        return data
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
    setOutputOutput(output: string) {
        this.dispatch({type: "setOutputOutput", payload: output})
    }
    setOutputDescription(description: string) {
        this.dispatch({type: "setOutputDescription", payload: description})
    }
    setStepDescription(description: string, index:number) {
        this.dispatch({type: "setStepDescription", payload: {description, index}})
    }

    validateInputs(inputs: IInput[]) {
        let result = inputs.filter(a => a.input.length > 0)
        return result
    }
    validateSteps(steps: IStep[]) {
        let result = steps.filter(a => a.task.length > 0)
        return result
    }
    validateOutput(output: IOutput) {
        let result = output.output.length > 0 ? output : false
        return result
    }

    async findInput(input: IInput){
        const data = await this.findEntityByString("inputs", "input", input.input)
        console.log(data)
        if (data.length === 0) {
            return input
        }
        return data[0]
    }

    async insertInputs(inputs: any[]) {
        const data = await this.insertItem("inputs", inputs)
        return data
    }

    async insertJobs(jobs: any[]) {
        const data = await this.insertItem("jobs", jobs)
        return data
    }

    async insertTools(tools: any[]) {
        const data = await this.insertItem("tools", tools)
        return data
    }


    async findStep(step: IStep) {
        let taskData
        let toolData
        taskData = await this.findEntityByString("jobs", "job", step.task)
        toolData = await this.findEntityByString("tools", "tool", step.tool)
        if (taskData.length === 0) {
            taskData = [step.task]
        }
        if (toolData.length === 0) {
            toolData = [step.tool]
        }
        return {taskData, toolData}
    }
    async findOutput (output: string) {
        const data = await this.findEntityByString("outputs", "output", output)
        if (data.length === 0) {
            return output
        }
        return data[0]
    }

    async findJobTool (jobTool: any) {
        let data
        if (jobTool.tool === null) {
            data = await this.supabase.from("jobs_tools").select("*").eq("job", jobTool.job).is("tool", jobTool.tool)
        }
        else {
            data = await this.supabase.from("jobs_tools").select("*").eq("job", jobTool.job).eq("tool", jobTool.tool)
        }
        if (data.data.length === 0) {
            return jobTool
        }
        return data.data[0]
    }

    async saveFlow(id: string) {
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

        if (!this.state.title) {
            errors.push("title")
        }
        
        if (errors.length) {
            console.log(errors)
            return
        }

        let foundInputs = []
        for (let item of validatedInputs) {
            const result = await this.findInput(item)
            foundInputs.push(result)
        }
        let foundSteps = []
        for (let item of validatedSteps) {
            const result = await this.findStep(item)
            foundSteps.push(result)
        }

        let foundOutput = await this.findOutput(this.state.output.output)
        if (!foundOutput.id) {
            foundOutput = await this.insertItem("outputs", [{
                output: this.state.output.output,
            }])
        }
        console.log(foundOutput)

        let inputInsertions = []
        for (let input of foundInputs) {
            if (input.input) {
                inputInsertions.push({
                    input: input.input,
                    description: input.description
                })
            }
        }
        if (inputInsertions.length) {
            const data = await this.insertInputs(inputInsertions)
            foundInputs = foundInputs.map(input => {
                if (input.input) {
                   return data.find(data => data.input === input.input)
                }
                return input
            })
        }

        let foundJobs = foundSteps.map(a => a.taskData).flat()
        let foundTools = foundSteps.map(a => a.toolData).flat()

        let jobInsertions = []
        for (let job of foundJobs) {
            if (!job.id) {
                jobInsertions.push({
                    job
                })
            } 
        }
        if (jobInsertions.length) {
            const data = await this.insertJobs(jobInsertions)
            foundJobs = foundJobs.map(job => {
                if (!job.id) {
                    return data.find(data => data.job === job)
                }
                return job
            })
        }

        let toolInsertions = []
        for (let tool of foundTools) {
            if (!tool.id && tool) {
                toolInsertions.push({
                    tool                
                })
            }
        }
        if (toolInsertions.length) {
            const data = await this.insertTools(toolInsertions)
            foundTools = foundTools.map(tool => {
                if (!tool.id) {
                    return data.find(data => data.tool === tool)
                }
                return tool
            })
        }
        
        let jobTools = foundJobs.map((job, i) => {
            return {
                job: job.id,
                tool: foundTools[i] ? foundTools[i].id : null
            }
        })

        let foundJobTools = []
        for (let jobTool of jobTools) {
            const result = await this.findJobTool(jobTool)
            foundJobTools.push(result)
        }
        
        let jobToolsInsertions = []
        for (let jobTool of foundJobTools) {
            if (!jobTool.id) {
                jobToolsInsertions.push(jobTool)
            }
        }
        if (jobToolsInsertions.length) {
            const data = await this.insertItem("jobs_tools", jobToolsInsertions)
            console.log(data)
            console.log(foundJobTools)
            foundJobTools = foundJobTools.map(jobTool => {
                if (!jobTool.id) {
                    return data.find(data => (data.job === jobTool.job && data.tool === jobTool.tool))
                }
                return jobTool
            })
        }
        const flowArr = await this.insertItem("flows", [{
            flow: this.state.title,
            author: id
        }])
        console.log(flowArr)
        const flow = flowArr[0]

        let jobToolImages = []
        for (let step of this.state.steps) {
          jobToolImages.push(await this.saveImages(step.images))  
        }


        let flowItems = foundJobTools.map((jobTool, index)=> {
            return {
                job_tool: jobTool.id,
                flow: flow.id,
                description: this.state.steps[index].description,
                image_url: jobToolImages[index]
            }
        })

        let flowsInputs = foundInputs.map((input, index) => {
            return {
                flow: flow.id,
                input: input.id,
                description: this.state.inputs[index].description
            }
        })

        let outputImages = await this.saveImages(this.state.output.images)

        await this.insertItem("flow_items", flowItems)
        await this.insertItem("flows_inputs", flowsInputs)
        await this.insertItem("flows_outputs", [{
            flow: flow.id,
            output: foundOutput.id,
            description: this.state.output.description,
            image_url: outputImages
        }])


    }

    async saveImages(images: File[]) {
        let dataArr = []
        for (let image of images) {
            const { data, error } = await this.supabase.storage
            .from('flows')
            .upload(`images/${uuidv4()}.png`, image)
            dataArr.push(data.Key)
        }
        console.log(dataArr)
        return dataArr

    }
}


