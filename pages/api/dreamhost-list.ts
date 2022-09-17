import { NextApiRequest, NextApiResponse } from "next";
import { dreamhostAdapter } from "../../adapters/other-apps/dreamhost/dreamhostAdapter";

export default async (req: NextApiRequest, res : NextApiResponse) => {
    const resp = await dreamhostAdapter.listDnsRecords()
    return res.status(200).json(resp)
}