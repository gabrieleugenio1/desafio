import { ProductEntity } from '../../product/entities/product.entity';

type Shift = 'DIURNO' | 'NOTURNO';

export interface MenuDTO {
  id?: string;
  name: string;
  products?: ProductEntity[];
  shift: Shift;
}
