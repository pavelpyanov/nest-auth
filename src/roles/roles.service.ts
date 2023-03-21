import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const newRole = await this.roleRepository.create(dto);
    return newRole.id;
  }

  async getRole(roleName: string) {
    return await this.roleRepository.findOne({ where: { value: roleName } });
  }

  async getAllRoles() {
    return await this.roleRepository.findAll();
  }
}
