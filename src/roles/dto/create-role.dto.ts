import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    example: 'ADMIN',
  })
  readonly value: string;

  @ApiProperty({
    type: String,
  })
  readonly description: string;
}
