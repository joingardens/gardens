import { NextApiRequest, NextApiResponse } from "next"
import { dreamhostAdapter } from "../../../adapters/other-apps/dreamhost/dreamhostAdapter"

export default async (req: NextApiRequest, res : NextApiResponse) => {
    if (req.method === "POST") {
        const ip = req.body.ip 
        const domain = req.body.domain
        const adapter = dreamhostAdapter
        const removal = await adapter.removeDnsRecord(domain, ip)
        console.log(removal)
        const response = await adapter.addDnsRecord(domain, ip)
        console.log(response)
        if (response.split("\n")[0] === "error") {
            return res.status(500).json({})
        }
        console.log(ip,domain)
        console.log(response)
        return res.status(200).json({})
    }
}