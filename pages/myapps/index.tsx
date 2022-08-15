import router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useToast from "../../components/hooks/useToast"
import Plus from "../../components/icons/Plus"
import DraftCard from "../../components/writer/draftCard"
import writerService from "../../components/writer/writerService"
import { useUser } from "../../utils/useUser"

const limit = 10

const MyAppsPage = () => {
    const {user} = useUser()
    const {makeToast} = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    return (
        <div className={`p-6 mt-12`}>
            <h1 className={`mb-7 flex justify-between`}>
                <div className={`text-2xl `}>
                    Your Apps
                </div>

            </h1>
            <div>
                Hello world
            </div>
        </div>
    )
}

export default MyAppsPage