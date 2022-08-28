import { NextApiRequest, NextApiResponse } from "next"
import { CaproverAdapter } from "../../../adapters/other-apps/caprover/caproverAdapter"

export default async (req: NextApiRequest, res : NextApiResponse) => {
    if (req.method === "POST") { 
        const token = req.body.token
        const url = req.body.url
        const email = req.body.email
        const adapter = new CaproverAdapter(url).setToken(token)
        const response = await adapter.enableSsl(email)
        return res.status(201).json(response.data)
    }
}