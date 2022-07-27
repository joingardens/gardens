import { FC, useEffect, useRef, useState } from "react"
import { userPaasAdapter } from "../adapters/userPaas/adapter"
import { useForm } from "../components/hooks/useForm"
import { useInput } from "../components/hooks/useInput"
import { ErrorsDictionary } from "../core/errors"
import { validationService } from "../services/validationService"
import { useUser } from "../utils/useUser"

export enum PaasInputNames {
    SLUG = "slug"
}


const NewPaasPage: FC  = () => {
    const {user} = useUser()
    const PaasInputState = useInput<string>(
        validationService.validateSubdomainName, 
        "",
        PaasInputNames.SLUG
    )
    const PaasFormHandler = async () => {
        const data = await userPaasAdapter.insertOne({
            user: user.id,
            slug: PaasInputState.value
        })
        console.log(data)
        if (data) {
            return data
        }
    }
    
    const PaasFormState = useForm([PaasInputState], PaasFormHandler)
    const [loaded, setLoaded] = useState(false)
    const [pageError, setPageError] = useState("")

    useEffect(() => {
        if (user) {
            userPaasAdapter.findOneByQuery({user: user.id})
            .then((res) => {
                setLoaded(true)
                if (res.data) {
                    if (res.data.length) {
                        setPageError(ErrorsDictionary.BaseErrors.EXISTING_PAAS)
                        return
                    } 
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

    console.log(PaasInputState.error, PaasFormState.isSubmited)

    return (
        <div className="px-20 py-10 w-ful min-h-screen">
            <h1 className={`text-2xl mb-5`}>
                Create new PaaS
            </h1>
            <form onSubmit={async (e) => {
                e.preventDefault()
                const data = await PaasFormState.submit()
                if (data) {
                    window.location.href = `${window.location.protocol}//${data.slug}.${window.location.host}`
                }
            }}>
                <div className={`grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-5`}>
                    <div className="grid grid-rows-1 gap-3">
                    <p>Pass name</p>
                    <input 
                        name={PaasInputNames.SLUG}
                        onChange={(e) => {
                            PaasInputState.setValue(e.target.value)
                        }}
                        value = {PaasInputState.value}
                        type="text" 
                        className={`ring-2 transition-all duration-300 ring-green-300 focus:ring-green-600 w-full rounded-md text-xl py-1 h-full px-1.5`} />
                    </div>
                    {PaasFormState.isSubmited && PaasInputState.error ? <p className="mt-2 text-red-600">
                        {PaasInputState.error ? ErrorsDictionary.PaasInputErrors.INVALID_DOMAIN_NAME : ""}
                    </p> : <></>}
                </div>
                <div>
                    <button 
                    className="px-4 py-2 border-2 border-gray-700 rounded-md">
                        Submit
                    </button>
                </div>
                            
            </form>
        </div> 
    )
}

export default NewPaasPage