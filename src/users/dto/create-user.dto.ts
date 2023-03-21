import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'test@test.com',
  })
  readonly email: string;

  @ApiProperty({
    type: String,
  })
  readonly password: string;
}
