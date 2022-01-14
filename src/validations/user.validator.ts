import { IsBoolean, IsDateString, IsEmail, IsInt, MaxLength, MinLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DateOnlyDataType } from "sequelize/dist";

@ValidatorConstraint({ name: 'DateLessThanYesterday', async: false })
export class DateLessThanYesterday implements ValidatorConstraintInterface {
    validate(text: string) {
        const date = new Date(`${text}T00:00:00`);
        const today = new Date();
        return date.getTime() < new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    }

    defaultMessage(args: ValidationArguments) {
        return `maximal allowed date for ${args.property} is ${getYesterday().toISOString()}`;
    }
}

export class UserValidator {

    @MaxLength(250)
    @MinLength(1)
    name: string;

    @IsDateString()
    @Validate(DateLessThanYesterday)
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