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

export class DigitalOceanDroplet {
    id: number;
    name: string;
    networks: {
        "ip_address": string,
        "netmask": string,
        "gateway": string,
        "type": "public" | "private"
    }[]
}

export class DigitalOceanDropletResponse {
    droplet: DigitalOceanDroplet
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

    async createDroplet(name: string, region: string, size: string) {
        const response = await this.instance.post<DigitalOceanDropletResponse>("droplets", {
            name,
            region,
            size,
            image: "caprover-18-04"
        })
        return response
    }

    async getDroplet(id: string) {
        const response = await this.instance.get(`droplets/${id}`)
        return response
    }
}

export const digitalOceanApiAdapter = new DigitalOceanApiAdapter()