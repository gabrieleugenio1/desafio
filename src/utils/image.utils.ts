import * as mime from 'mime-types';
import { BadRequestException, BadGatewayException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

export async function saveImage(image: Express.Multer.File): Promise<string> {
  const keyFilename = process.env.KEY_FILENAME;
  const projectId = process.env.PROJECT_ID;
  const bucketName = process.env.BUCKET_NAME;

  // Check if Google Cloud configuration is missing
  if (!keyFilename || !projectId || !bucketName) {
    throw new Error('Google Cloud configuration is missing.');
  }
  // Initialize Google Cloud Storage
  const gc = new Storage({
    keyFilename: keyFilename,
    projectId: projectId,
  });

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

  // Create a filename with timestamp and original name
  const timestamp = Date.now();
  const filename = `${timestamp}_${image.originalname}`;

  try {
    // Upload the image to Google Cloud Storage
    const bucket = gc.bucket(bucketName);
    const file = bucket.file(filename);
    await file.save(image.buffer, {
      contentType: mimeType,
      public: true, // Make the file public
    });

    // Return the public URL of the uploaded image
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
    return publicUrl;
  } catch (error) {
    throw new BadGatewayException('Failed to upload image to Google Cloud Storage.');
  }
}
