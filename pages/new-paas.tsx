import { FC, useEffect, useRef, useState } from "react"
import { userPaasAdapter } from "../adapters/userPaas/adapter"
import { FormError, useForm } from "../components/hooks/useForm"
import { useInput } from "../components/hooks/useInput"
import { ErrorsDictionary } from "../core/errors"
import { validationService } from "../services/validationService"
import { useUser } from "../utils/useUser.js"

export enum PaasInputNames {
    SLUG = "slug",
    ORG_NAME = "org_name"
}


const NewPaasPage: FC = () => {
    const { user, userLoaded } = useUser()
    const PaasInputState = useInput<string>(
        validationService.validateSubdomainName,
        "",
        PaasInputNames.SLUG
    )
    const PaasOranisationInputState = useInput<string>(
        validationService.validateOrganisationName,
        "",
        PaasInputNames.ORG_NAME
    )
    const PaasFormHandler = async () => {
        const existingForm = await userPaasAdapter.findOneByQuery({
            slug: PaasInputState.value
        })
        if (existingForm.data.length) {
            PaasFormState.setFormError(new FormError(true, ErrorsDictionary.BaseErrors.EXISTING_PAAS))
            return
        }
        const data = await userPaasAdapter.insertOne({
            org_name: PaasOranisationInputState.value,
            user: user.id,
            slug: PaasInputState.value
        })
        if (data) {
            return data
        }
    }

    const PaasFormState = useForm([PaasInputState, PaasOranisationInputState], PaasFormHandler)
    const [loaded, setLoaded] = useState(false)
    const [pageError, setPageError] = useState("")


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true)
        }, 4000)
        if (user) {
            userPaasAdapter.findOneByQuery({ user: user.id })
                .then((res) => {
                    setLoaded(true)
                    if (res.data) {
                        if (res.data.length) {
                            setPageError(ErrorsDictionary.BaseErrors.USER_ALREADY_HAS_ORGANISATION)
                            return
                        }
                    }

                })
        }
        return () => clearTimeout(timer)
    }, [user])

    if (!loaded) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (!user) {
        return (
            <div>
                <h1 className={`text-5xl mb-2`}>
                    {ErrorsDictionary.BaseErrors.NO_AUTH}
                </h1>
            </div>
        )
    }

    if (pageError) {
        return (
            <div>
                {pageError}
            </div>
        )
    }



    return (
        <div className="px-20 py-10 w-full min-h-screen">
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
                <div className={`grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-5 gap-5`}>
                    <div className="">
                        <p className={`mb-2`}>Subdomain name</p>
                        <input
                            name={PaasInputNames.SLUG}
                            onChange={(e) => {
                                PaasFormState.setFormError(FormError.getDefaultState())
                                PaasInputState.setValue(e.target.value)
                            }}
                            value={PaasInputState.value}
                            type="text"
                            className={`ring-2 transition-all duration-300 ring-green-300 focus:ring-green-600 w-full rounded-md text-xl py-1 px-1.5`}
                        />
                        {
                            PaasFormState.isSubmited
                                ?
                                <p className="mt-2 text-red-600">
                                    {PaasInputState.error ? ErrorsDictionary.PaasInputErrors.INVALID_DOMAIN_NAME : ""}
                                </p>
                                :
                                <></>
                        }
                    </div>
                    <div className={``}>
                        <p className="mb-2">Name of your organisation</p>
                            <input
                                name={PaasInputNames.ORG_NAME}
                                onChange={(e) => {
                                    PaasOranisationInputState.setValue(e.target.value)
                                }}
                                value={PaasOranisationInputState.value}
                                type="text"
                                className={`ring-2 transition-all duration-300 ring-green-300 focus:ring-green-600 w-full rounded-md text-xl py-1 px-1.5`}
                            />
                        {
                            PaasFormState.isSubmited
                            ?
                            <p className="mt-2 text-red-600">
                                {PaasOranisationInputState.error ? ErrorsDictionary.PaasInputErrors.INVALID_ORGANISATION_NAME : ""}
                            </p>
                            :
                            <></>
                        }
                    </div>

                </div>
                <div className={`flex`}>
                    <button
                        className="px-4 py-2 border-2 border-gray-700 rounded-md mr-5">
                        Submit
                    </button>
                    {
                        PaasFormState.formError.isError
                            ?
                            <div className="text-red-600">
                                {PaasFormState.formError.errorText}
                            </div>
                            :
                            <div>

                            </div>
                    }
                </div>

            </form>
        </div>
    )
}

export default NewPaasPage