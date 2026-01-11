import { z } from "zod";

import {
  MAX_SFTP_FILE_SIZE,
  MAX_SFTP_MB_SIZE,
  SFPT_DIRS,
  SFTP_ACCEPTED_MEDIA_TYPES,
  SFTP_API_ERROR_CODES,
} from "~/constants/sftp";

import { env } from "~/env.mjs";
import type { SFTPMediaType } from "~/types/sftp-types";
import { httpsUrlString, standardString } from "./common-zod-helpers";

const filenameRegExp = /^[a-zA-Z0-9-]{3,100}\.[a-zA-Z0-9]{1,5}$/;

export const sftpUrl = httpsUrlString.refine(
  (str) => str.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL),
  `Måste börja på ${env.NEXT_PUBLIC_SFTP_BASE_URL}`,
);

export const sftpFilename = standardString.regex(
  filenameRegExp,
  `Ogiltigt filnamn. Använder följande regex: ${filenameRegExp}`,
);

export const sftpFile = z
  .custom<File>(
    (input) => input instanceof File,
    "Ogiltig input. Behöver vara en fil",
  )
  .refine((file) => {
    return file.size <= MAX_SFTP_FILE_SIZE;
  }, `Filen får inte vara större än ${MAX_SFTP_MB_SIZE}MB. Kontakta Webbgruppen om du behöver ladda upp större grejer.`)
  .refine(
    (file) => SFTP_ACCEPTED_MEDIA_TYPES.includes(file.type as SFTPMediaType),
    "Inte en godkänd filtyp. Kontakta webbgruppen om du behöver ladda upp den här filtypen.",
  );

export const sftpDir = z.enum(SFPT_DIRS, {
  errorMap: () => ({
    message: `Ogiltigt directory. Måste vara ett av följande: "${SFPT_DIRS.join(
      ", ",
    )}"`,
  }),
});

export const sftpAPIErrorCode = z.enum(SFTP_API_ERROR_CODES);
