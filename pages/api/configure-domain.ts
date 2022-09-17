import { NextApiRequest, NextApiResponse } from "next";
import { CaproverAdapter } from "../../adapters/other-apps/caprover/caproverAdapter";
import { userDropletsAdapter } from "../../adapters/userDroplets/adapter";
import { EncryptionService } from "../../services/encryptionService";

export default async (req: NextApiRequest, res : NextApiResponse) => {
    const { userDropletId, password, domain, token, url } = req.body
    const responseOne = await userDropletsAdapter.update({
        droplet_id: userDropletId
    }, {
        domain
    })
    const encryptionService = new EncryptionService(process.env.ENCRYPTION_SECRET)
    const adapter = new CaproverAdapter(url).setToken(token)
    const responseCap = await adapter.caproverChangePassword(password)
    if (responseCap.data.status > 100) {
        return res.status(500).json({error: responseCap.data.description})
    }
    const responseSupabase = await userDropletsAdapter.update({
        droplet_id: userDropletId,
    }, {
        password: encryptionService.encrypt(password),
    })
    return res.status(201).json(responseSupabase.data)
}