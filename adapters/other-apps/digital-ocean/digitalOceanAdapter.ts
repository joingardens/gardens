import { BaseAdapter } from "../../baseAdapter";
import { BaseHttpAdapter } from "../baseHttpAdapter";

export class DigitalOceanRegion {
    name: string
    slug: string
    sizes: string[]
    available: boolean
}

export class DigitalOceanRegionsResponse {
    links: any
    meta: {total: number}
    regions: DigitalOceanRegion[]
}

class DigitalOceanApiAdapter extends BaseHttpAdapter {
    constructor() {
        super("https://api.digitalocean.com/v2/")
    }

    setToken(token: string) {
        console.log("token changed")
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async getRegions() {
        const response = await this.instance.get<DigitalOceanRegionsResponse>("regions")
        const filteredResp = response.data.regions.filter(a => a.available)
        return filteredResp
    }
}

export const digitalOceanApiAdapter = new DigitalOceanApiAdapter()