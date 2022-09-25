import { BaseHttpAdapter } from "../../other-apps/baseHttpAdapter";

class MastodonApiAdapter extends BaseHttpAdapter {
    constructor() {
        const url = "https://masto.cloud.joingardens.com/api/v1/"
        super(url)
    }

    async getRepliesByStatusId(statusId: string) {
        const response = await this.instance.get(("/statuses/" + statusId + "/context"))
        return response
    }

    async getRecentMastoPosts() {
        const response = await this.instance.get(("/timelines/public?limit=4"))
        return response
    }

    async getStatusById(statusId: string) {
        const response = await this.instance.get(("/statuses/" + statusId))
        return response
    }

    async postReply(replyToId: string) {
        const response = await this.instance.post("/statuses/", {

        })
        return response
    }
}

export const mastodonAdapter = new MastodonApiAdapter()