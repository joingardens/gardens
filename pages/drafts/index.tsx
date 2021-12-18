import router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useToast from "../../components/hooks/useToast"
import Plus from "../../components/icons/Plus"
import DraftCard from "../../components/writer/draftCard"
import writerService from "../../components/writer/writerService"
import { useUser } from "../../utils/useUser"

const limit = 10

const DraftsPage = () => {
    const {user} = useUser()
    const {makeToast} = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [drafts, setDrafts] = useState([])
    const [page, setPage] = useState(1)

    const fetchDrafts = async (page) => {
        const newDrafts = await writerService.getDraftsbyUser(user.id, page, limit)
        if (newDrafts) {
            setDrafts([...drafts, ...newDrafts])
        }
    }

    useEffect(() => {
        setDrafts([])
    }, [])

    useEffect(() => {
        if (user) {
            fetchDrafts(page)
        }
    }, [user ? user.id : null])

    const deleteDraft = (id:number) => {
        writerService.deleteDraft(id, user.id)
        .then((res) => {
            console.log(drafts)
            console.log(res)
            setDrafts(drafts.filter(a => a.id !== res.id))
        })
    }
    const publishDraft = (id:number) => {
        writerService.publishDraft(id, user.id)
        .then((res) => {
            console.log(drafts)
            console.log(res)
            alert("Your draft was published! Open to share it with the world")
        })
    }
    const unpublishDraft = (id:number) => {
        writerService.unpublishDraft(id, user.id)
        .then((res) => {
            console.log(drafts)
            console.log(res)
            alert("Your draft was unpublished! Only you can access it now")
        })
    }

    return (
        <div className={`p-6 mt-12`}>
            <h1 className={`mb-7 flex justify-between`}>
                <div className={`text-2xl `}>
                    Your Drafts
                </div>
                <button 
                onClick={async (e) => {
                    if (user) {
                       const result = await writerService.createNewDraft(user.id)
                        writerService.goToWriter(router, result.id)
                    }
                    else {
                        makeToast("Not logged in", "error", 3)
                    }
                }}
                className={`flex items-center bg-gray-50 rounded border border-black hover:bg-gray-100 transition-all px-3`}>
                    <div>
                        + New Draft
                    </div>
                </button>

            </h1>
            <div className={`grid grid-cols-1 gap-5`}>
                {drafts.map(a => {
                    return  <DraftCard 
                    deleteDraft={deleteDraft}
                    publishDraft={publishDraft}
                    unpublishDraft={unpublishDraft}
                    isPublished={a.isPublished}
                    draftName={a.draftName}
                    created={a.created}
                    id={a.id}
                    />
                })}
            </div>
        </div>
    )
}

export default DraftsPage