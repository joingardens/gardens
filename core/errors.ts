export namespace ErrorsDictionary {
    export enum BaseErrors {
        NO_AUTH = "You are not authenticated to view this page",
        EXISTING_PAAS = "PaaS with this name already exists",
        USER_ALREADY_HAS_ORGANISATION = "User already has an organisation"
    }
    
    export enum PaasInputErrors {
        INVALID_DOMAIN_NAME = "Invalid domain name",
        INVALID_ORGANISATION_NAME = "Invalid organisation name"
    }
}