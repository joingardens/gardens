import router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useUser } from "../../utils/useUser"
import useToast from "../../components/hooks/useToast"
import Plus from "../../components/icons/Plus"
import DraftCard from "../../components/writer/draftCard"
import writerService from "../../components/writer/writerService"
import Title from '../../components/ui/Title';
import Sidebar from '../../components/ui/Sidebar';

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
    <>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'My Posts'} 
    titleDescription={'Welcome to your posts section'} />
    </div>
    <div className="flex justify-center">
    <div className="px-5 w-full mb-24 mt-24 md:mt-16">
    <Sidebar page="drafts" />
    <div className="flex flex-col flex-wrap justify-center items-end w-4/5 sm:pl-8 md:pl-16 md:justify-start mx-auto py-4">
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
                className={`flex items-center hover:bg-gray-50 rounded border border-black hover:bg-gray-100 transition-all px-2`}>
                    <div className="py-2 px-2 font-semibold">
                        + New Post
                    </div>
                </button>
            <div className="flex flex-col mt-4 w-full">
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
        </div>
        </div>
     </>
    )
}

export default DraftsPage