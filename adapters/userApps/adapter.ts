import { BaseAdapter } from "../baseAdapter";
import { parameters } from "../../types/supabase"
import { TableDictionary } from "../tableDictionary";

class UserAppsAdapter extends BaseAdapter<parameters["body.user_apps"]> {
    constructor() {
        super(TableDictionary.USER_APPS)
    }
}

export const userAppsAdapter = new UserAppsAdapter()