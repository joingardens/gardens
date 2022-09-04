import { FC, useEffect, useRef, useState } from "react"
import { userPaasAdapter } from "../adapters/userPaas/adapter"
import { FormError, useForm } from "../components/hooks/useForm"
import { useInput } from "../components/hooks/useInput"
import { ErrorsDictionary } from "../core/errors"
import { validationService } from "../services/validationService"
import { useUser } from "../utils/useUser.js"
import router from "next/router"

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
    const PaasOrganizationInputState = useInput<string>(
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
            org_name: PaasOrganizationInputState.value,
            user: user.id,
            slug: PaasInputState.value
        })
        if (data) {
            router.push("/onboarding/prerequisites")
        }
    }

    const PaasFormState = useForm([PaasInputState, PaasOrganizationInputState], PaasFormHandler)
    const [loaded, setLoaded] = useState(false)
    const [slugIsCustom, setSlugIsCustom] = useState(false)
    const [pageError, setPageError] = useState("")

    useEffect(() => {
        if (PaasOrganizationInputState.value && !slugIsCustom){
            PaasInputState.setValue(PaasOrganizationInputState.value.toLowerCase().split(' ').join('-'))
        }
    }, [PaasOrganizationInputState.value])


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
                            router.push("/onboarding/prerequisites")
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
        <div className="px-10 mt-10 w-full min-h-screen">
            <h1 className={`text-2xl font-bold mb-5 mx-auto text-center`}>
                Set up your organization
            </h1>
            <form onSubmit={async (e) => {
                e.preventDefault()
                const data = await PaasFormState.submit()
                if (data) {
                    window.location.href = `${window.location.protocol}//${data.slug}.${window.location.host}`
                }
            }}>
                <div className={"flex flex-col md:w-1/2 w-full mx-auto"}>
                    <div className={"my-2"}>
                        <p className="mb-2 font-semibold">Organization name</p>
                        <p className="mb-2 text-gray-600">Enter the name of your organization, e.g. "My Org"</p>
                            <input
                                name={PaasInputNames.ORG_NAME}
                                onChange={(e) => {
                                    PaasOrganizationInputState.setValue(e.target.value)
                                }}
                                value={PaasOrganizationInputState.value}
                                type="text"
                                className={`border w-full rounded-md text-xl py-1 px-1.5`}
                            />
                        {
                            PaasFormState.isSubmited
                            ?
                            <p className="mt-2 text-red-600">
                                {PaasOrganizationInputState.error ? ErrorsDictionary.PaasInputErrors.INVALID_ORGANISATION_NAME : ""}
                            </p>
                            :
                            <></>
                        }
                    </div>
                    <div className="my-2">
                        <p className={`mb-2 font-semibold`}>Organization slug</p>
                        <p className="mb-2 text-gray-600">This will be used to create your domain on Gardens. Only lowercase letters and hyphens.</p>
                        <input
                            disabled={!slugIsCustom}
                            name={PaasInputNames.SLUG}
                            onChange={(e) => {
                                PaasFormState.setFormError(FormError.getDefaultState())
                                PaasInputState.setValue(e.target.value)
                            }}
                            value={PaasInputState.value}
                            type="text"
                            className={`border ${!slugIsCustom ? ("bg-gray-50 cursor-not-allowed") : null} w-full rounded-md text-xl py-1 px-1.5`}
                        />
                        <div className="flex my-4 items-center">
                        <input className="h-4 w-4 my-auto" checked={slugIsCustom} onClick={() => {setSlugIsCustom(!slugIsCustom)}} type="checkbox"/>
                        <span className="ml-2">Set custom slug</span>
                        </div>
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
                    <div className={`mt-6`}>
                    <button
                        className="px-4 py-2 border border-black hover:bg-gray-50 rounded-md mr-5">
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
                </div>
            </form>
        </div>
    )
}

export default NewPaasPage