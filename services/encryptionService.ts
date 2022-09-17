import CryptoJS from "crypto-js"

export class EncryptionService {
    constructor(private secret: string) {}
    
    encrypt(string: string) {
       return CryptoJS.AES.encrypt(string, this.secret).toString()
    }

    decrypt(string: string) {
        return CryptoJS.AES.decrypt(string, this.secret).toString(CryptoJS.enc.Utf8)
    }
}