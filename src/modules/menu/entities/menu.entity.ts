import { MenuProductEntity } from '../../menu-product/entities/MenuProduct.entity';

export enum ShiftMenu {
  DIURNO = 'DIURNO',
  NOTURNO = 'NOTURNO',
}

export type Shift = 'DIURNO' | 'NOTURNO';

export interface MenuEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  menu?: MenuProductEntity[];
  shift: Shift;
}
