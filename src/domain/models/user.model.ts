import { IsEmail, MaxLength } from "class-validator";
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { DateOnlyDataType } from "sequelize/types";
import { Address } from "./address.model";
import { Store } from "./store.model";



@Table
export class User extends Model<User>{

    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    @MaxLength(5)
    name: string;


    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    birthDate: DateOnlyDataType;

    @IsEmail()
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;


    @Column({
        type: DataType.STRING(11),
        allowNull: false,
        unique: true
    })
    cpf: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    salt: string;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    adressId: number;

    @ForeignKey(() => Store)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: null
    })
    storeId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userType: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    active: boolean;


    @BelongsTo(() => Address)
    addres: Address;

    @BelongsTo(() => Store)
    store: Store;


}