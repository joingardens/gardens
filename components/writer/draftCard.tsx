import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs"
import { useRouter } from 'next/router'
dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)
dayjs.extend(utc)

interface DraftCardProps {
    draftName?: string,
    created: string,
    id: number,
    deleteDraft: (id:number) => void
}



const DraftCard = ({draftName, created, id, deleteDraft}: DraftCardProps) => { 
    const {push} = useRouter()
    return (
        <div 
        onClick={() => {
            push(`/drafts/${id}`)
        }}
        className={`h-auto w-full border-gray-600 border rounded-md hover:shadow transition-all py-4 px-4 cursor-pointer`}>
            <div className={`flex justify-between`}>
                <div className={`text-xl mb-2`}>
                <h2>{draftName ? (draftName) : 'Untitled'}</h2>
                </div>
                <button
                onClick={(e) => {
                    e.stopPropagation()
                    deleteDraft(id)
                }} className="border border-red-300 hover:bg-red-100 rounded px-4"
                >
                Delete
                </button>
            </div>

                <div className="text-gray-600 text-sm">
                    {dayjs(created).local().fromNow()}
                </div>
        </div>
    )
}

export default DraftCard