import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { CaproverAdapter } from "../../../adapters/other-apps/caprover/caproverAdapter"

export default async (req: NextApiRequest, res : NextApiResponse) => {
    if (req.method === "POST") {
        const password = req.body.password ? req.body.password : ""
        const adapter = new CaproverAdapter(req.body.url)
        try {
            const response = await adapter.login(password)
            return res.status(200).json({token: response.data.data.token})
        }
        catch(e) {
            return res.status(500)
        }   

    }
}