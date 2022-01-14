import { IsBoolean, IsDateString, IsEmail, IsInt, MaxDate, MaxLength, MinLength } from "class-validator";
import { DateOnlyDataType } from "sequelize/dist";

export class UserValidator {

    @MaxLength(250)
    @MinLength(1)
    name: string;

    @IsDateString()
    @MaxDate(getYesterday())
    birthDate: DateOnlyDataType;

    @IsEmail()
    email: string;

    @MaxLength(11)
    @MinLength(11)
    cpf: string;


    @MinLength(8)
    password: string;

    @IsInt()
    adressId: number;

    userType: string;

    @IsBoolean()
    active: boolean;

}

function getYesterday() {

    const date = new Date()
    date.setDate(date.getDate() - 1);
    return date
}