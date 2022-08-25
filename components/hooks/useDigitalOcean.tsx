import { useEffect, useState } from "react"
import { digitalOceanApiAdapter } from "../../adapters/other-apps/digital-ocean/digitalOceanAdapter"

export const useDigitalOcean = () => {
    const [token, setToken] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('digital_ocean_access_token')
        if (token) {
            setToken(token)
            digitalOceanApiAdapter.setToken(token)
        }
    }, [])

    const changeToken = (token: string) => {
        setToken(token)
        digitalOceanApiAdapter.setToken(token)
        localStorage.setItem("digital_ocean_access_token", token)
    }

    return {
        token, 
        changeToken,
        digitalOceanApiAdapter
    }
}