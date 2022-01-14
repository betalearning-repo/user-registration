import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Address } from './address.model'
import { AdressesService } from "./adresses.service";

@Controller('adresses')
export class AdressesController {

    constructor(private addressService: AdressesService) {

    }

    @Get()
    async obterTodos(): Promise<Address[]> {
        return this.addressService.obterTodos()
    }

    @Get(':id')
    //onde eu nomeio o param com paramn
    //onde eu pego o params.id (nome dado)
    async obterUm(@Param() params): Promise<Address> {
        return this.addressService.obterUm(params.id)
    }

    @Post()
    async criar(@Body() Address: Address) {
        this.addressService.criar(Address)
    }

    @Delete(':id')
    async deletar(@Param() params) {
        this.addressService.apagar(params.id)
    }

}