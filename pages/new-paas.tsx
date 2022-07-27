import { FC, useEffect, useRef, useState } from "react"
import { userPaasAdapter } from "../adapters/userPaas/adapter"
import { useInput } from "../components/hooks/useInput"
import { ErrorsDictionary } from "../core/errors"
import { validationService } from "../services/validationService"
import { useUser } from "../utils/useUser"

const NewPaasPage: FC  = () => {
    const PaasInputState = useInput(validationService.validateSubdomainName)
    const [loaded, setLoaded] = useState(false)
    const [pageError, setPageError] = useState("")
    const {user, userLoaded} = useUser()

    useEffect(() => {
        console.log(user)
        if (user) {
            userPaasAdapter.findOneByQuery({user: user.id})
            .then((res) => {
                if (res.data) {
                    if (res.data.length) {
                        setPageError(ErrorsDictionary.BaseErrors.EXISTING_PAAS)
                        return
                    }
                    setLoaded(true)
                }

            })
        }
    }, [user])

    if (!loaded) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (!user) {
        <div>
            <h1 className={`text-5xl mb-2`}>
                {ErrorsDictionary.BaseErrors.NO_AUTH}
            </h1>
        </div>
    }

    if (pageError) {
        return (
            <div>
                {pageError}
            </div>
        )
    }

    return (
        <div className="px-20 py-10 w-ful min-h-screen">
            <h1 className={`text-2xl mb-5`}>
                Create new PaaS
            </h1>
            <div className={`grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-5`}>
                <div className="grid grid-rows-1 gap-3">
                <p>Pass name</p>
                <input 
                    onChange={(e) => {
                        PaasInputState.setValue(e.target.value)
                    }}
                    value = {PaasInputState.value}
                    type="text" 
                    className={`ring-2 transition-all duration-300 ring-green-300 focus:ring-green-600 w-full rounded-md text-xl py-1 h-full px-1.5`} />
                </div>
            </div>
            <div>
                <button className="px-4 py-2 border-2 border-gray-700 rounded-md">
                    Submit
                </button>
            </div>
        </div> 
    )
}

export default NewPaasPage