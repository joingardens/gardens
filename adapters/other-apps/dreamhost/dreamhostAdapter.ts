import { BaseHttpAdapter } from "../baseHttpAdapter";

class DreamhostAdapter extends BaseHttpAdapter {
    constructor() {
        super("https://api.dreamhost.com/")
        this.instance.interceptors.request.use(function (config) {
            config.params = {
                key: process.env.DREAMHOST_API_KEY,
                ...config.params
            }
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          })
    }

    async addDnsRecord (domain: string, ip: string) {
        const result = await this.instance.get("", {
            params: {
                cmd: "dns-add_record",
                type: "A",
                value: ip,
                record: domain
            }
        })
        return result.data
    }

    async removeDnsRecord (domain: string, ip: string) {
        const result = await this.instance.get("", {
            params: {
                cmd: "dns-remove_record",
                type: "A",
                value: ip,
                record: domain
            }
        })
        return result.data
    }

    async listDnsRecords() {
        const result = await this.instance.get("", {
            params: {
                cmd: "dns-list_records",
            }
        })
        return result.data
    }
}

export const dreamhostAdapter = new DreamhostAdapter()