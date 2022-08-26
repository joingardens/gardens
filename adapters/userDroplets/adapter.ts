import { BaseAdapter } from "../baseAdapter";
import { parameters } from "../../types/supabase"
import { TableDictionary } from "../tableDictionary";

class UserDropletsAdapter extends BaseAdapter<parameters["body.user_droplets"]> {
    constructor() {
        super(TableDictionary.USER_DROPLETS)
    }
}

export const userDropletsAdapter = new UserDropletsAdapter()