import { OutputBlockData } from "@editorjs/editorjs"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import writerService from "../../components/writer/writerService"
import { useUser } from "../../utils/useUser"
import { API, BlockAPI, OutputData} from "@editorjs/editorjs"
import dynamic from "next/dynamic"
import useAutosave from "../../components/writer/useEditorAutosave"
import AutosizeInput from "react-input-autosize"

export const EditorJsWithNoSSR = dynamic(() => import("../../components/writer/NoSSREditor"), {
    ssr: false,
  });

const DraftPage = () => {
    const {query} = useRouter()
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [payload, setPayload] = useState<OutputBlockData[]>([])
    useAutosave(title, payload, query.id as string)
    const {userLoaded, user} = useUser()

    const getInitialDraft = async (draftId:number, userId:string) => {
        const initialDraft = await writerService.authDraft(draftId, userId)
        if (initialDraft) {
            console.log(initialDraft.payload)
            setPayload(initialDraft.payload)
            setTitle(initialDraft.draftName)
            setLoading(false)
        }
    }

    

    useEffect(() => {
        if (!loading) {

        }
    },[loading])



    useEffect(() => {
        const id:number = query.id as any
        if (userLoaded && user && id) {
            getInitialDraft(id, user.id)
        }
    }, [userLoaded])


    
    return (
        <div className={`p-6`}>
            {!loading && 
                <AutosizeInput
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    placeholder={"Your title here"}
                />    
            }
            <button
            className={`ml-4`}
            onClick={() => {
                writerService.insertDraft(payload, user.id, title, query.id as any)
            }}
            >
                Save
            </button>

            <div>
            {!loading && <EditorJsWithNoSSR
            data={payload}
            setState={setPayload}
            />}
            </div>
        </div>
    )
}

export default DraftPage