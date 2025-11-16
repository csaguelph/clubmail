import { env } from "@/env";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import crypto from "crypto";

/**
 * Cloudflare R2 Storage Service
 * Provides S3-compatible storage for media uploads
 */

let r2Client: S3Client | null = null;

function getR2Client(): S3Client {
  if (!r2Client) {
    if (
      !env.R2_ACCOUNT_ID ||
      !env.R2_ACCESS_KEY_ID ||
      !env.R2_SECRET_ACCESS_KEY ||
      !env.R2_BUCKET_NAME
    ) {
      throw new Error(
        "R2 configuration is missing. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME environment variables.",
      );
    }

    r2Client = new S3Client({
      region: "auto",
      endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
      },
    });
  }

  return r2Client;
}

export interface UploadResult {
  key: string;
  url: string;
  size: number;
  mimeType: string;
}

/**
 * Upload a file to R2 storage
 */
export async function uploadToR2(
  buffer: Buffer,
  filename: string,
  mimeType: string,
  clubId?: string,
): Promise<UploadResult> {
  const client = getR2Client();

  // Generate a unique key with optional club prefix
  const ext = filename.split(".").pop() || "";
  const hash = crypto.randomBytes(16).toString("hex");
  const timestamp = Date.now();
  const key = clubId
    ? `clubs/${clubId}/${timestamp}-${hash}.${ext}`
    : `global/${timestamp}-${hash}.${ext}`;

  // Upload to R2
  const upload = new Upload({
    client,
    params: {
      Bucket: env.R2_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    },
  });

  await upload.done();

  // Generate public URL
  const url = env.R2_PUBLIC_URL
    ? `${env.R2_PUBLIC_URL}/${key}`
    : `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.R2_BUCKET_NAME}/${key}`;

  return {
    key,
    url,
    size: buffer.length,
    mimeType,
  };
}

/**
 * Delete a file from R2 storage
 */
export async function deleteFromR2(key: string): Promise<void> {
  const client = getR2Client();

  await client.send(
    new DeleteObjectCommand({
      Bucket: env.R2_BUCKET_NAME!,
      Key: key,
    }),
  );
}

/**
 * Get a file from R2 storage
 */
export async function getFromR2(key: string): Promise<Buffer> {
  const client = getR2Client();

  const response = await client.send(
    new GetObjectCommand({
      Bucket: env.R2_BUCKET_NAME!,
      Key: key,
    }),
  );

  if (!response.Body) {
    throw new Error("File not found in R2 storage");
  }

  // Convert stream to buffer
  const chunks: Uint8Array[] = [];
  for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

/**
 * Validate file type and size
 */
export function validateMediaFile(
  mimeType: string,
  size: number,
): { valid: boolean; error?: string } {
  // Allowed MIME types
  const allowedTypes = [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    // Documents (if needed)
    "application/pdf",
  ];

  if (!allowedTypes.includes(mimeType)) {
    return {
      valid: false,
      error: `File type ${mimeType} is not allowed. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  // Max file size: 10MB
  const maxSize = 10 * 1024 * 1024;
  if (size > maxSize) {
    return {
      valid: false,
      error: `File size ${(size / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}

/**
 * Get image dimensions from buffer
 */
export async function getImageDimensions(
  buffer: Buffer,
  mimeType: string,
): Promise<{ width: number; height: number } | null> {
  // This is a simple implementation - you may want to use a library like 'sharp' or 'image-size'
  // For now, we'll return null and handle dimensions on the client side if needed

  // If using sharp (requires installation):
  // try {
  //   const sharp = require('sharp');
  //   const metadata = await sharp(buffer).metadata();
  //   return { width: metadata.width ?? 0, height: metadata.height ?? 0 };
  // } catch (error) {
  //   console.error('Failed to get image dimensions:', error);
  //   return null;
  // }

  return null;
}

/**
 * Check if R2 is configured
 */
export function isR2Configured(): boolean {
  return !!(
    env.R2_ACCOUNT_ID &&
    env.R2_ACCESS_KEY_ID &&
    env.R2_SECRET_ACCESS_KEY &&
    env.R2_BUCKET_NAME
  );
}
