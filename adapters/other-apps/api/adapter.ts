import { BaseHttpAdapter } from "../baseHttpAdapter";

type DigitalOceanResponseData = {
    token: string
}

class ApiAdapter extends BaseHttpAdapter {
    constructor() {
        const url = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://joingardens.com/"
        super(url)
    }

    async getDigitalOceanCode(code: string) {
        const response = await this.instance.post<DigitalOceanResponseData>("/api/ocean-auth", {code})
        return response
    }
}

export const apiAdapter = new ApiAdapter()