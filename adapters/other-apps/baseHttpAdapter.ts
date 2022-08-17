import axios, { AxiosInstance } from "axios"

export class BaseHttpAdapter {
    instance: AxiosInstance
    constructor( baseURL: string ) {
        this.instance = axios.create({
            baseURL
        })
    }

    
}