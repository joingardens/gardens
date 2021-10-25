import { API, BlockAPI, OutputBlockData, OutputData} from "@editorjs/editorjs"
import { SupabaseServiceClass } from "../../utils/supabase-client"

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

const objectsEqual = (o1, o2) => 
    typeof o1 === 'object' && Object.keys(o1).length > 0 
        ? Object.keys(o1).length === Object.keys(o2).length 
            && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;

const arraysEqual = (a1, a2) => 
        a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

export class WriterService extends SupabaseServiceClass {
    timer: number
    timerActive: boolean
    constructor() {
        super()
        this.timer = 10
        this.timerActive = false
    }
    transformBlockData(block: OutputBlockData) {
        if (block.type === "paragraph") {
            return this.transfromParagraph(block.data)
        }
    }

    transfromParagraph(data: {text: string}) {
        return (
            <p dangerouslySetInnerHTML={{__html: data.text}}/>
                
        )
    }

    async insertDraft(payload: OutputBlockData[], user: string, draftName: string) {
        const {data, error} = await this.supabase.from("drafts").upsert({
            payload,
            user,
            draftName: draftName,
            uniqueid: user+draftName
        }, {onConflict: "uniqueid"})
        console.log(data, error)
        return data
    }

    async getDraftbyId(id: number) {
        const {data, error} = await this.supabase.from("drafts").select('payload').eq("id", id)
        return data[0]
    }

    comparePayloads(first: OutputBlockData[], second: OutputBlockData[] ) {
        return arraysEqual(first, second)
    }

    async initAutosave() {
        
    }



}

export default new WriterService