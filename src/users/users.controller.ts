import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/jwtAuth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Number,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  @ApiOkResponse({
    type: User,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get all user' })
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JWTAuthGuard)
  @ApiOkResponse({
    type: User,
  })
  @ApiOperation({ summary: 'Get one user' })
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(Number(id));
  }
}
