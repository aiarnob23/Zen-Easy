import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

const AWS_REGION = process.env.AWS_REGION as string;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME as string;


if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !S3_BUCKET_NAME) {
  console.error("Missing AWS S3 environment variables. Please check your .env file.");
  process.exit(1); 
}

// Configure AWS S3 Client
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// Upload a single file to S3
const uploadFileToS3 = async (file: MulterFile, folder: string): Promise<string | null> => {
  if (!file) {
    return null;
  }

  const fileExtension = path.extname(file.originalname);
  const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${fileExtension}`;
  const s3Key = `${folder}/${uniqueFileName}`;

  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: s3Key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: ObjectCannedACL.public_read,
  };

  try {
    const uploader = new Upload({
      client: s3Client,
      params: params,
    });
    const data = await uploader.done();
    return data.Location as string;
  } catch (error: any) {
    console.error(`Error uploading ${file.originalname} to S3:`, error);
    return null;
  }
};

// Upload multiple files to S3
const uploadFilesToS3 = async (files: MulterFile[], folder: string): Promise<string[]> => {
  if (!files || files.length === 0) {
    return [];
  }

  const uploadedUrls: string[] = [];

  await Promise.all(files.map(async (file) => {
    const url = await uploadFileToS3(file, folder);
    if (url) {
      uploadedUrls.push(url);
    }
  }));

  return uploadedUrls;
};

export const ImageService = {
  uploadFileToS3,
  uploadFilesToS3,
};