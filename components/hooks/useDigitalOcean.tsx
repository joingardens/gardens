import { useEffect, useState } from "react"

export const useDigitalOcean = () => {
    const [token, setToken] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('digital_ocean_access_token')
        if (token) {
            setToken(token)
        }
    }, [])

    const changeToken = (token: string) => {
        console.log(token)
        setToken(token)
        localStorage.setItem("digital_ocean_access_token", token)
    }

    return {
        token, 
        changeToken
    }
}