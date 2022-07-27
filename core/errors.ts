export namespace ErrorsDictionary {
    export enum BaseErrors {
        NO_AUTH = "You are not authenticated to view this page",
        EXISTING_PAAS = "PaaS with this name already exists",
    }
    
    export enum PaasInputErrors {
        INVALID_DOMAIN_NAME = "Invalid domain name"
    }
}