import { BaseAdapter } from "../baseAdapter";
import { parameters } from "../../types/supabase"
import { TableDictionary } from "../tableDictionary";

class UsersAdapter extends BaseAdapter<parameters["body.users"]> {
    constructor() {
        super(TableDictionary.USERS)
    }

    async sendRecoveryRequest( email: string ) {
        const response = await this.supabase.auth.api.resetPasswordForEmail(email)
        return response
    }

    async recoverPassword( accessToken: string, password: string) {
        const response = await this.supabase.auth.api.updateUser(accessToken, { password })
        return response
    }
}

export const userAdapter = new UsersAdapter()