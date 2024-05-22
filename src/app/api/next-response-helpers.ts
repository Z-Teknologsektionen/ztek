import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import type { SFTPErrprResponseBody } from "~/types/sftp-types";

export const NextResponseZODError = (
  error: ZodError,
): NextResponse<SFTPErrprResponseBody> => {
  const formatedErrors = error.issues
    .map(({ path, message }) => `${path.join(".")}: ${message}`)
    .join(", ");

  return NextResponse.json(
    {
      error: `Ogiltig input: ${formatedErrors}`,
    },
    {
      status: 400,
    },
  );
};

export const NextResponseServerError =
  (): NextResponse<SFTPErrprResponseBody> => {
    return NextResponse.json(
      {
        error: "Något gick fel! Försök igen senare eller kontakta Webbgruppen",
      },
      {
        status: 500,
      },
    );
  };
