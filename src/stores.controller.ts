import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Store } from "./store.model";
import {StoresService} from './stores.service'

@Controller('stores')
export class StoresController {

    constructor(private storeService: StoresService) {

    }

    @Get()
    async obterTodos(): Promise<Store[]> {
        return this.storeService.obterTodos()
    }

    @Get(':id')
    //onde eu nomeio o param com paramn
    //onde eu pego o params.id (nome dado)
    async obterUm(@Param() params): Promise<Store> {
        return this.storeService.obterUm(params.id)
    }

    @Post()
    async criar(@Body() store: Store) {
        this.storeService.criar(store)
    }

    @Delete(':id')
    async deletar(@Param() params) {
        this.storeService.apagar(params.id)
    }

}