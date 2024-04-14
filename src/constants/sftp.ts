import type { SFTPMediaType } from "~/types/sftp-types";

export const MAX_SFTP_MB_SIZE = 200;
export const MAX_SFTP_FILE_SIZE = MAX_SFTP_MB_SIZE * 1024 * 1024;

export const SFPT_DIRS = ["media"] as const;

// Här defineras alla filtyper som är okej att ladda upp till SFTP servern
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
export const SFTP_ACCEPTED_MEDIA_TYPES = [
  "application/pdf",
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/apng",
  "image/svg+xml",
  "image/webp",
] as const;

// Här defineras zenith medias godkända filtyper
export const ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/apng",
] satisfies SFTPMediaType[];
