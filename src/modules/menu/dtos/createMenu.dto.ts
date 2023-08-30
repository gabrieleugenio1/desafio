import { IsEnum } from 'class-validator';
import { ShiftMenu as Shift } from '../entities/menu.entity';
import { ApiProperty } from '@nestjs/swagger';

export class createMenuDTO {
  @ApiProperty({ enum: Shift })
  @IsEnum(Shift, { each: true })
  shift: Shift;
}
