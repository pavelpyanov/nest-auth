import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttributes {
  email: string;
  password: string;
}

@Table({
  tableName: 'roles',
})
export class Role extends Model<Role, RoleCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  @ApiProperty()
  value: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty()
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
