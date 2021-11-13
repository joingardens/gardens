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

    return (
        <div className={`p-6`}>
            <h1 className={`mb-7 flex justify-between`}>
                <div className={`text-2xl `}>
                    Your Drafts!
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
                className={`flex items-center hover:shadow transition-all px-3`}>
                    <div className={`w-8 h-8 mr-1`}>
                        <Plus/>
                    </div>
                    <div>
                        Add new!
                    </div>
                </button>

            </h1>
            <div className={`grid grid-cols-1 gap-5`}>
                {drafts.map(a => {
                    return  <DraftCard 
                    deleteDraft={deleteDraft}
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