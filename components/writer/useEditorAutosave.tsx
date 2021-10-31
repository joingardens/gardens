import { OutputBlockData } from "@editorjs/editorjs";
import { useEffect, useState } from "react";
import { useUser } from "../../utils/useUser"
import useToast from "../hooks/useToast";
import writerService from "./writerService";

const objectsEqual = (o1, o2) => 
    typeof o1 === 'object' && Object.keys(o1).length > 0 
        ? Object.keys(o1).length === Object.keys(o2).length 
            && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;

const arraysEqual = (a1, a2) => 
        a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

const useAutosave = (draftName: string, payload: OutputBlockData[], draftId:string) => {
    const {user} = useUser()
    const [prevPayload, setPrevPayload] = useState(payload)
    const [trigger, setTrigger] = useState(0)
    const {makeToast} = useToast()

    useEffect(() => {
        const timer = setTimeout(() => {
            setTrigger(trigger+1)
        }, 10000)
        if (!writerService.comparePayloads(prevPayload, payload)) {
            setPrevPayload(payload)
            makeToast("Autosaved!", "succ", 3)
            if (user && draftId) {
                writerService.insertDraft(payload, user.id, draftName, draftId)
            }
        }
        return () => {
            clearTimeout(timer)
        }
    }, [trigger, draftId, user])
}

export default useAutosave