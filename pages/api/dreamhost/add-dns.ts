import { NextApiRequest, NextApiResponse } from "next"
import { digitalOceanApiAdapter, DigitalOceanNetworkType } from "../../../adapters/other-apps/digital-ocean/digitalOceanAdapter"
import { dreamhostAdapter } from "../../../adapters/other-apps/dreamhost/dreamhostAdapter"
import { userDropletsAdapter } from "../../../adapters/userDroplets/adapter"

export default async (req: NextApiRequest, res : NextApiResponse) => {
    if (req.method === "POST") {
        const digitalOceanToken = req.body.digiocean
        const user = req.body.user
        const ip = req.body.ip 
        const domain = "*." + req.body.domain 
        if (!domain) {
            return res.status(500).json({})
        }
        const adapter = dreamhostAdapter
        const supabase = userDropletsAdapter
        const digiocean = digitalOceanApiAdapter
        digiocean.setToken(digitalOceanToken)
        const result = (await supabase.findOneByQuery({user})).body[0]
        if (!result) {
            return res.status(500).json({})
        }
        console.log(result)
        const droplet = await (await digiocean.getDroplet(result.droplet_id)).data.droplet
        if (!droplet) {
            return res.status(500).json({})
        }
        let publicNetwork: DigitalOceanNetworkType = null
        for (let network of droplet.networks.v4) {
          if (network.type === "public") {
            publicNetwork = network
          }
        }
        const ipMatch = publicNetwork.ip_address === ip
        if (!ipMatch) {
            return res.status(500).json({})
        }
        const list = await adapter.listDnsRecords()
        for (let item of list) {
            if (item.zone === domain) {
                const removal = await adapter.removeDnsRecord(domain, ip)
                console.log(removal)
            }
        }
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