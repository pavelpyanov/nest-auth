import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EMAIL_REGEX } from 'src/common/regex/email';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    if (!dto.email) {
      throw new BadRequestException(`Email is required`);
    }

    if (!dto.password) {
      throw new BadRequestException(`Password is required`);
    }

    if (!EMAIL_REGEX.test(dto.email)) {
      throw new BadRequestException(`Invalid email`);
    }

    const isUserExist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (isUserExist) {
      throw new ConflictException(`User ${dto.email} already exist`);
    }

    const role = await this.roleService.getRole('USER');

    if (!role) {
      throw new NotFoundException(
        'Role user not found, but it is required for user',
      );
    }

    const user = await this.userRepository.create(dto);

    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUser(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async getUserByEmail(email: string) {
    const result = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return result;
  }
}
