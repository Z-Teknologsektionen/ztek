import { NextResponse, type NextRequest } from "next/server";
import {
  sftpDeleteFileSchema,
  sftpRenameFileSchema,
  sftpUploadNewFileSchema,
} from "~/schemas/sftp";
import type { NextSFTPAPIResponseWithUrl } from "~/types/sftp-types";
import {
  deleteFileFromSftpServer,
  renameFileOnSftpServer,
  uploadFileToSftpServer,
} from "~/utils/sftp/sftp-engine";

export async function POST(request: NextRequest): NextSFTPAPIResponseWithUrl {
  const formData = await sftpUploadNewFileSchema.safeParseAsync(
    Object.fromEntries(await request.formData()),
  );

  if (!formData.success) {
    const firstIssue = formData.error.issues.at(0);

    return NextResponse.json(
      {
        error: `Ogiltig input ${
          firstIssue && `${firstIssue?.path.join(" ")}: ${firstIssue?.message}`
        }`,
      },
      {
        status: 400,
      },
    );
  }

  const bytes = await formData.data.file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const url = await uploadFileToSftpServer({
      input: buffer,
      ...formData.data,
    });

    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Något gick fel! Försök igen senare eller kontakta Webbgruppen",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest): NextSFTPAPIResponseWithUrl {
  const body = await sftpRenameFileSchema.safeParseAsync(await request.json());

  if (!body.success) {
    const firstIssue = body.error.issues.at(0);

    return NextResponse.json(
      {
        error: `Ogiltig input ${
          firstIssue && `${firstIssue?.path.toString()}: ${firstIssue?.message}`
        }`,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const url = await renameFileOnSftpServer(body.data);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Något gick fel! Försök igen senare eller kontakta Webbgruppen",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: NextRequest): NextSFTPAPIResponseWithUrl {
  const body = await sftpDeleteFileSchema.safeParseAsync(await request.json());

  if (!body.success) {
    const firstIssue = body.error.issues.at(0);

    return NextResponse.json(
      {
        error: `Ogiltig input ${
          firstIssue && `${firstIssue?.path.toString()}: ${firstIssue?.message}`
        }`,
      },
      {
        status: 400,
      },
    );
  }

  try {
    await deleteFileFromSftpServer(body.data);
    return NextResponse.json({
      success: true,
      url: body.data.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Något gick fel! Försök igen senare eller kontakta Webbgruppen",
      },
      {
        status: 500,
      },
    );
  }
}
