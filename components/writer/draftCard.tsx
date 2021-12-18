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
    isPublished: boolean,
    deleteDraft: (id:number) => void
    publishDraft: (id:number) => void
    unpublishDraft: (id:number) => void
}



const DraftCard = ({draftName, created, id, isPublished, deleteDraft, publishDraft, unpublishDraft}: DraftCardProps) => { 
    const {push} = useRouter()
    console.log(isPublished)
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
                <div className="h-8">
                {(isPublished ? (
                    <button
                onClick={(e) => {
                    e.stopPropagation()
                    unpublishDraft(id)
                }} className="border border-yellow-300 hover:bg-yellow-100 rounded px-4 h-full mr-4"
                >
                Make private
                </button>
                ) : (
                    <button
                onClick={(e) => {
                    e.stopPropagation()
                    publishDraft(id)
                }} className="border border-green-300 hover:bg-green-100 rounded px-4 h-full mr-4"
                >
                Make public
                </button>
                ))}
                
                <button
                onClick={(e) => {
                    e.stopPropagation()
                    deleteDraft(id)
                }} className="border border-red-300 hover:bg-red-100 rounded px-4 h-full"
                >
                Delete
                </button>
                </div>
            </div>

                <div className="text-gray-600 text-sm">
                    {dayjs(created).local().fromNow()}
                </div>
        </div>
    )
}

export default DraftCard