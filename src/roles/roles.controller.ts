import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { JWTAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  @ApiOkResponse({
    type: String,
  })
  @ApiOperation({ summary: 'Create role' })
  @UseGuards(JWTAuthGuard)
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get(':roleValue')
  @ApiOkResponse({
    type: Role,
  })
  @ApiOperation({ summary: 'Get one role' })
  @UseGuards(JWTAuthGuard)
  getRole(@Param('roleValue') role: string) {
    const result = this.roleService.getRole(role);
    return result;
  }

  @Get()
  @ApiOkResponse({
    type: Role,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get all roles' })
  @UseGuards(JWTAuthGuard)
  getAllRoles() {
    const result = this.roleService.getAllRoles();
    return result;
  }
}
