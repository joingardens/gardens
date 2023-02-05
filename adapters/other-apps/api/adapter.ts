import { BaseHttpAdapter } from "../baseHttpAdapter";

type DigitalOceanResponseData = {
    token: string
}

class ApiAdapter extends BaseHttpAdapter {
    constructor() {
        const url = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://www.joingardens.com/"
        super(url)
    }

    async getDigitalOceanCode(code: string) {
        const response = await this.instance.post<DigitalOceanResponseData>("/api/ocean-auth", {code})
        return response
    }
}

export class DreamhostServerAdapter extends ApiAdapter {
    constructor(private ip: string) {
        super()
    }

    async addDnsRecord(domain: string) {
        const response = await this.instance.post("api/dreamhost/add-dns", {
            domain,
            ip: this.ip
        }) 
        return response
    }

}

export class CaproverServerApiAdapter extends ApiAdapter {
    private token: string
    private url: string
    constructor (url: string) {
        super()
        this.url = `http://${url}:3000`
    }

    setToken(token: string) {
        this.token = token
        return this
    }

    async caproverLogin() {
        const response = await this.instance.post<{token: string}>("api/caprover/login", {
            url: this.url
          })
        return response
    }

    async caproverSetRootDomain(domain: string) {
        const response = await this.instance.post<any>("api/caprover/change-root-domain", {
            url: this.url,
            token: this.token,
            domain
        })
        return response
    }

    async caproverEnableSSL(email: string) {
        const response = await this.instance.post<any>("api/caprover/enable-ssl", {
            url: this.url,
            token: this.token,
            email
        })
        return response
    }

    async caproverForceSSL() {
        const response = await this.instance.post<any>("api/caprover/force-ssl", {
            url: this.url,
            token: this.token
        })
        return response
    }

}

export const apiAdapter = new ApiAdapter()