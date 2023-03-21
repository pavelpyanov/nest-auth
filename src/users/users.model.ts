import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRoles } from 'src/roles/user-roles.model';
import { Role } from 'src/roles/roles.model';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({
  tableName: 'users',
})
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty()
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty()
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  @ApiProperty()
  banned: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  @ApiProperty()
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
