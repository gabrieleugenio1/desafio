import * as path from 'path';
import * as fs from 'fs/promises';
import * as mime from 'mime-types';
import { BadRequestException } from '@nestjs/common';

export async function saveImage(image: Express.Multer.File): Promise<string> {
  const mimeType = mime.lookup(image.originalname);

  if (image.size > 10 * 1024 * 1024) {
    throw new BadRequestException('Image size exceeds 10MB');
  }
  if (!mimeType || !mimeType?.startsWith('image/')) {
    throw new BadRequestException('File is not an image.');
  }

  const timestamp = Date.now();
  const filename = `${timestamp}_${image.originalname}`;
  const imagePath = path.join('./uploads', filename);

  // Verificar se o diretório de destino existe, se não existir, criar
  const directory = path.dirname(imagePath);
  await fs.mkdir(directory, { recursive: true });

  // Salvar a imagem no diretório
  await fs.writeFile(imagePath, image.buffer);
  return imagePath;
}
