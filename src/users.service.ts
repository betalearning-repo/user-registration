import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Address } from "./address.model";
import { Store } from "./store.model";
import { User } from "./user.model";


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) { }

    async obterTodos(): Promise<User[]> {
        return this.userModel.findAll({ include: Address })
    }

    async obterUm(id: number): Promise<User> {
        return this.userModel.findByPk(id)
    }

    async criar(user: User) {

        if (user.userType.toUpperCase() === 'CLIENTE') {
            this.userModel.findAll({ include: Store })
        }
        
        try {

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