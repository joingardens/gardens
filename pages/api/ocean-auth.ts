import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res : NextApiResponse) => {
    if (req.method === "POST") {
        const response = await axios.post("https://cloud.digitalocean.com/v1/oauth/token", {}, {
            params: {
                code: req.body.code as string,
                client_id: process.env.NEXT_PUBLIC_DIGITAL_OCEAN_CLIENT_ID,
                client_secret: process.env.DIGITAL_OCEAN_SECRET,
                redirect_uri: "https://joingardens.com/onboarding/provision",
                grant_type: "authorization_code"
            }
        })
        if (response.data) {
            console.log(response.data)
            return res.status(201).json({token: response.data.access_token})
        }
        return res.status(500).json({})

    }
}

 