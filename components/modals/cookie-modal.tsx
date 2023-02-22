import { useContext, useEffect, useState } from "react"
import Button from "../ui/Button"
import ModalOverlay from "./modalOverlay"
import ModalsContext from "./modalsContext"
import posthog from 'posthog-js'
import { usePostHog } from "next-use-posthog"

export const CookieModal = () => {
    const [load, setLoad] = useState(false)
    usePostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST, loaded: () => {
        setLoad(true)
      }})
    const {state, service} = useContext(ModalsContext)

    const isOpen = state["cookie"]

    useEffect(() => {
        if (load) {
            if (posthog.has_opted_out_capturing() || posthog.has_opted_in_capturing() ) {
                return
            }
            service.openModal("cookie")
        }

    }, [load])

    const acceptCookies = () => { 
        posthog.opt_in_capturing(); // new
        service.closeModal("cookie")
      };
    
      const declineCookies = () => {
        posthog.opt_out_capturing(); // new
        service.closeModal("cookie")
      };
    return (
        <ModalOverlay modal={"cookie"} clickClose={false}>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onMouseUp={(e) => {
                    e.stopPropagation()
                }}
                onMouseDown={(e) => {e.stopPropagation()}}
                className={`
                    overflow-y-auto max-w-3xl w-full h-60 lg:h-40 relative z-50 bg-white rounded-lg
                    ${isOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-75"}
                    transition-all duration-300 transform origin-center 
                    overflow-x-hidden p-6 self-end
                    `}>
                <div className={`w-full min-w-full `}>
                    <div className="mb-4 text-center">
                    Gardens uses cookies to help improve your experience and for marketing purposes. Read our privacy policy here or update cookie settings.
                    </div>
                <div className="flex gap-3 justify-center">
                    <Button 
                    onClick={declineCookies}
                    className={`px-2 py-2 text-black text-sm text-left hover:bg-blue-100 focus:bg-blue-100  transition-all`}>
                    No, thanks
                    </Button>
                    <Button 
                    onClick={acceptCookies}
                    className={`px-2 py-2 bg-green-600 text-sm text-left hover:bg-green-500 focus:bg-green-500 text-white  transition-all`}>
                    Accept all
                    </Button>
                </div>
                </div>
            </div>
        </ModalOverlay>
    )
}