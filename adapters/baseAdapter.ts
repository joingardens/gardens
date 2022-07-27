import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { BigNumber } from "bignumber.js"

export type SupabaseInsertionDoc<T> = Omit<Omit<T, "id">, "created_at">

export class BaseAdapter<T> {
    private readonly supabase: SupabaseClient
    constructor(
        private tableName: string
    ) {
        this.supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
    }

    async insert(entities: Partial<T>[]) {
        const response = await this.supabase
            .from<T>(this.tableName)
            .insert(entities)
        return response
    }

    async insertOne(entity: Partial<T>) {
        const response = await this.insert([entity])
        if (response.data) {
            return response.data[0]
        }
        if (response.error) {
            return false
        }
    }

    async findManyByQuery(query: Partial<T>, page = 1, limit = 10) {
        let response = this.supabase
        .from<T>(this.tableName)
        .select('*')
        const first = +new BigNumber(page).minus(1).multipliedBy(limit)
        const second = +new BigNumber(page).multipliedBy(limit).minus(1)
        for (let key of Object.entries(query)) {

            response = response.eq(key[0] as keyof T, key[1] as T[keyof T])
        }
        response.limit(limit)
        console.log(first, second)
        response.range(first, second)
        return await response
    }

    async findOneByQuery(query: Partial<T>) {
        let response = await this.findManyByQuery(query, 1, 1)
        return response
    }


}