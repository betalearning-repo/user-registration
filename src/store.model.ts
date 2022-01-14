import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { User } from "./user.model";


@Table
export class Store extends Model<Store>{

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

   
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    active: boolean;

    @HasMany(() => User)
    users: User[]

}