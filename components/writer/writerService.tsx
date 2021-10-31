import { API, BlockAPI, OutputBlockData, OutputData} from "@editorjs/editorjs"
import { NextRouter, Router } from "next/router";
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

    async insertDraft(payload: OutputBlockData[], user: string, draftName: string, draftId: string) {
        const {data, error} = await this.supabase.from("drafts").update({
            payload,
            draftName,
        }).match({id: draftId, user})
        console.log(data)
        return data
    }

    async createNewDraft(user: string) {
        const {data} = await this.supabase.from("drafts").insert({
            user
        })
        console.log(data)
        return data[0]
    }

    goToWriter(router: NextRouter, id: number) {
        router.push(`/drafts/${id}`)
    }

    async getDraftbyId(id: number) {
        const {data, error} = await this.supabase.from("drafts").select('payload').eq("id", id)
        return data[0]
    }

    comparePayloads(first: OutputBlockData[], second: OutputBlockData[] ) {
        return arraysEqual(first, second)
    }

    async deleteDraft(id:string, user: string) {
        const {data} = await this.supabase.from("drafts").delete().eq("id", id).eq("user", user)
        return data
    }

    async getDraftsbyUser(id: string, page: number, limit:number) {
        const {data, error} = await this.supabase.from("drafts").select("draftName,created,id").eq("user", id).range((page-1) * limit, page * limit).order("created")
        return data
    }

    async authDraft(draftId:number, userId:string) {
        const {data} = await this.supabase.from("drafts").select("id,created,draftName,payload").eq("user", userId).eq("id", draftId)
        return data[0]
    }



}

export default new WriterService