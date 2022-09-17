import { BaseHttpAdapter } from "../baseHttpAdapter";

class CaproverResponse<T> {
    status: number
    description: string
    data: T
}

class CaproverTokenData {
    token: string
}

export class CaproverAdapter extends BaseHttpAdapter {
    constructor(url: string) {
        super(url)
        this.instance.defaults.headers["x-namespace"] = "captain"
    }

    setToken(token: string) {
        this.instance.defaults.headers["x-captain-auth"] = token
        return this
    }



    async login(password?: string) {
        const response = await this.instance.post<CaproverResponse<CaproverTokenData>>("/api/v2/login/", {
            "password": password ? password : "captain42"
        })
        return response
    }

    async changeRootDomain(domain: string) {
        const response = await this.instance.post<CaproverResponse<any>>("/api/v2/user/system/changerootdomain", {
            rootDomain: domain
        })
        return response
    }

    async enableSsl(email: string) {
        const response = await this.instance.post<CaproverResponse<any>>("/api/v2/user/system/enablessl", {
            emailAddress: email
        })
        return response
    }

    async forceSsl(bool: boolean) {
        const response = await this.instance.post<CaproverResponse<any>>("/api/v2/user/system/forcessl", {
            isEnabled: bool
        })
        return response
    }


    async caproverChangePassword( newPassword: string, oldPassword?: string,) {
        const response = await this.instance.post<CaproverResponse<any>>("api/v2/user/changepassword", {
            oldPassword: oldPassword ? oldPassword : "captain42",
            newPassword
        })
        return response
    }
}

