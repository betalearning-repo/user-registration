import { Body, Controller, Delete, Get, HttpException, Param, Post } from "@nestjs/common";
import { validate } from "class-validator";
import { User } from './user.model'
import { UserValidator } from "./user.validator";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Get()
    async obterTodos(): Promise<User[]> {
        return this.userService.obterTodos()
    }

    @Get(':id')
    //onde eu nomeio o param com paramn
    //onde eu pego o params.id (nome dado)
    async obterUm(@Param() params): Promise<User> {
        return this.userService.obterUm(params.id)
    }

    @Post()
    async criar(@Body() user: User) {
        const userValidator = Object.assign(new UserValidator(), user)
        const errors = await validate(userValidator)       
        if (errors.length > 0) {
            throw new HttpException(errors, 400);
        }
        await this.userService.criar(user)
    }

    @Delete(':id')
    async deletar(@Param() params) {
        this.userService.apagar(params.id)
    }

}