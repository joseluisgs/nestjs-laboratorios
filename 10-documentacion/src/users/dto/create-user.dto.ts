import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
 /* @ApiProperty()
  age: number;*/
}