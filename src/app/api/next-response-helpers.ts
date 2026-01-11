import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import type { SFTPErrorResponseBody } from "~/types/sftp-types";

// REMOVE THIS COMMENT BEFORE MERGE:
// these are quite generic functions but currently only used in SFTP api
// remove this file if not needed in SFTP api

export const NextResponseZODError = (
  error: ZodError,
): NextResponse<SFTPErrorResponseBody> => {
  const formattedErrors = error.issues
    .map(({ path, message }) => `${path.join(".")}: ${message}`)
    .join(", ");

  return NextResponse.json(
    {
      error: `Ogiltig input: ${formattedErrors}`,
    },
    {
      status: 400,
    },
  );
};

export const NextResponseServerError =
  (): NextResponse<SFTPErrorResponseBody> => {
    return NextResponse.json(
      {
        error: "Något gick fel! Försök igen senare eller kontakta Webbgruppen",
      },
      {
        status: 500,
      },
    );
  };
