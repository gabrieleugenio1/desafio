import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isCuid } from '@paralleldrive/cuid2';

@Injectable()
export class CuidPipe implements PipeTransform {
  transform(value: string) {
    if (!isCuid(value)) {
      throw new BadRequestException('Invalid CUID format.');
    }
    return value;
  }
}
