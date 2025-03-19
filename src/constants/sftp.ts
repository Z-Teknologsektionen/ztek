import type { SFTPMediaType } from "~/types/sftp-types";

// https://vercel.com/guides/how-to-bypass-vercel-body-size-limit-serverless-functions
// Då vi för tillfället inte kan använda oss av någon väg runt detta sätts max MB till 4. Detta bör kunna lösas i app router sen
export const MAX_SFTP_MB_SIZE = 4;
export const MAX_SFTP_FILE_SIZE = MAX_SFTP_MB_SIZE * 1024 * 1024;

export const SFPT_DIRS = ["media"] as const;

// Här definieras alla filtyper som är okej att ladda upp till SFTP servern
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
export const SFTP_ACCEPTED_MEDIA_TYPES = [
  "application/pdf",
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
] as const;

// Här definieras zenith medias godkända filtyper
export const ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] satisfies SFTPMediaType[];
