import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Address } from "../models/address.model";
import { User } from "../models/user.model";
import { StoresService } from "./stores.service";

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
            return await this.userModel.create(user)
        } catch (e) {
            throw new HttpException(e, 422)
        }
    }

    async apagar(id: number) {
        const user: User = await this.obterUm(id)
        user.destroy()
    }
}