import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Unique, AllowNull, Default, HasMany } from "sequelize-typescript";
import Budget from "./Budget";

@Table({
    tableName: 'users'
})

class User extends Model{
    @AllowNull(false)
    @Column({
        type: DataType.STRING(1000)
    })
    declare name: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare password: string

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(50)
    })
    declare email: string

    @Column({
        type: DataType.STRING(6)
    })
    declare token: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean

    @HasMany(() => Budget, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare budgets : Budget[]
}


export default User