import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Address } from "../models/address.model";
import { User } from "../models/user.model";
import { StoresService } from "./stores.service";
import { Encrypt } from "../utils/encrypt";




@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private storeService: StoresService

    ) { }

    async obterTodos(): Promise<User[]> {
        return this.userModel.findAll({ include: Address })
    }

    async obterUm(id: number): Promise<User> {
        return this.userModel.findByPk(id)
    }

    async criar(user: User) {
        try {
            if (user.userType.toUpperCase() === 'CLIENTE') {
                const [store] = await this.storeService.obterTodos()
                user.storeId = store.id

            }
            const { salt, encryptedPassword } = new Encrypt().encryptPassword(user.password)
            user.password = encryptedPassword
            user.salt = salt
            return await this.userModel.create(user)

        } catch (e) {
            console.log(e.stack || e.message)
            throw new HttpException(e, 422)
        }
    }



    async apagar(id: number) {
        const user: User = await this.obterUm(id)
        user.destroy()
    }
}

