import { NextApiRequest, NextApiResponse } from "next"
import { CaproverAdapter } from "../../../adapters/other-apps/caprover/caproverAdapter"

export default async (req: NextApiRequest, res : NextApiResponse) => {
    if (req.method === "POST") { 
        const token = req.body.token
        const url = req.body.url
        const domain = req.body.domain
        const adapter = new CaproverAdapter(url).setToken(token)
        const response = await adapter.changeRootDomain(domain)
        if (response.data.status > 100) {
            return res.status(500).json(response.data.description)
        }
        return res.status(201).json(response.data)
    }
}