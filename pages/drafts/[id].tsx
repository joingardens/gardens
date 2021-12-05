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
        <div className={`p-6 w-full flex flex-col justify-center`}>
        <div className="flex items-center justify-center w-full">
            {!loading && 
                <div className="max-w-full mt-12 flex w-full text-center">
                <AutosizeInput
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    placeholder={"Name your draft..."}
                    className="text-xl mx-auto"
                    inputStyle={{maxWidth: "20rem"}}
                />
                </div>    
            }
            <button
            className={`absolute top-0 left-0 ml-8 mt-20 border border-green-300 hover:bg-green-50 rounded py-1 px-2`}
            onClick={() => {
                writerService.insertDraft(payload, user.id, title, query.id as any)
            }}
            >
                Save
            </button>
            </div>
            <div className="p-4 mt-4 w-full">
            {!loading && <EditorJsWithNoSSR
            data={payload}
            setState={setPayload}
            />}
            </div>
        </div>
    )
}

export default DraftPage