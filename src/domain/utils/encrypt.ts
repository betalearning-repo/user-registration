import * as crypto from 'crypto'

export class Encrypt {


    generateSalt(): string {
        return crypto.randomBytes(16).toString('hex')
    }

    encryptPassword = (password, salt = this.generateSalt()) => {

        const encryptedPassword = crypto.pbkdf2Sync(
            password,
            salt,
            100000,
            64,
            "sha512"
        )

        return {
            salt,
            encryptedPassword: encryptedPassword.toString('hex')
        }
    }
}