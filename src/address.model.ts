import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class Address extends Model<Address>{

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    street: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    number: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,

    })
    district: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    complement: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cep: number;

    @HasMany(() => User)
    users: User[]
}