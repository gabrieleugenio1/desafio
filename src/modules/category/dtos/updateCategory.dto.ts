import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDTO {
  @ApiProperty()
  @IsString()
  name: string;
}