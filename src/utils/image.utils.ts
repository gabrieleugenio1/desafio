import * as path from 'path';
import * as fs from 'fs/promises';
import * as mime from 'mime-types';
import { BadRequestException } from '@nestjs/common';

export async function saveImage(image: Express.Multer.File): Promise<string> {
  // Get the mime type of the image
  const mimeType = mime.lookup(image.originalname);

  // Check if image size is less than 10MB
  if (image.size > 10 * 1024 * 1024) {
    throw new BadRequestException('Image size exceeds 10MB');
  }

  // Check if file is an image (png, jpg, jpeg, gif)
  if (!mimeType || !mimeType?.startsWith('image/')) {
    throw new BadRequestException('File is not an image.');
  }

  const timestamp = Date.now();
  // Create a filename with timestamp and original name
  const filename = `${timestamp}_${image.originalname}`;
  // Create the path to save the image
  const imagePath = path.join('./uploads', filename);

  // Verify if the destination directory exists, if not, create
  const directory = path.dirname(imagePath);
  await fs.mkdir(directory, { recursive: true });

  // Save the image in the uploads folder
  await fs.writeFile(imagePath, image.buffer);
  return imagePath;
}
