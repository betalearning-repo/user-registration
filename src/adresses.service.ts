import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Address } from "./address.model";


@Injectable()
export class AdressesService {

    constructor(
        @InjectModel(Address)
        private addressModel: typeof Address
    ) { }

    async obterTodos(): Promise<Address[]> {
        return this.addressModel.findAll()
    }

    async obterUm(id: number): Promise<Address> {
        return this.addressModel.findByPk(id)
    }

    async criar(address: Address) {
        this.addressModel.create(address)
    }

    async apagar(id: number) {
        const address: Address = await this.obterUm(id)
        address.destroy()
    }
}