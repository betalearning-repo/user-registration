import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Store } from "../models/store.model";


@Injectable()
export class StoresService {

    constructor(
        @InjectModel(Store)
        private storeModel: typeof Store
    ) { }

    async obterTodos(): Promise<Store[]> {
        return this.storeModel.findAll()
    }

    async obterUm(id: number): Promise<Store> {
        return this.storeModel.findByPk(id)
    }

    async criar(store: Store) {
        this.storeModel.create(store)
    }

    async apagar(id: number) {
        const store: Store = await this.obterUm(id)
        store.destroy()
    }
}