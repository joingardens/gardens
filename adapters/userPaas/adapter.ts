import { BaseAdapter } from "../baseAdapter";
import { parameters } from "../../types/supabase"
import { TableDictionary } from "../tableDictionary";

class UserPaasAdapter extends BaseAdapter<parameters["body.user_paas"]> {
    constructor() {
        super(TableDictionary.USER_PAAS)
    }
}

export const userPaasAdapter = new UserPaasAdapter()