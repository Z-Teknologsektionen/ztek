"use server";
import { NextResponse, type NextRequest } from "next/server";
import {
  NextResponseServerError,
  NextResponseZODError,
} from "~/app/api/next-response-helpers";
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
} from "./utils/sftp-engine";

export async function POST(request: NextRequest): NextSFTPAPIResponseWithUrl {
  const result = sftpUploadNewFileSchema.safeParse(
    Object.fromEntries(await request.formData()),
  );

  if (!result.success) {
    return NextResponseZODError(result.error);
  }

  const bytes = await result.data.file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const url = await uploadFileToSftpServer({
      input: buffer,
      ...result.data,
    });
    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponseServerError();
  }
}

export async function PUT(request: NextRequest): NextSFTPAPIResponseWithUrl {
  const result = sftpRenameFileSchema.safeParse(await request.json());

  if (!result.success) {
    return NextResponseZODError(result.error);
  }

  try {
    const url = await renameFileOnSftpServer(result.data);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponseServerError();
  }
}

export async function DELETE(request: NextRequest): NextSFTPAPIResponseWithUrl {
  const result = sftpDeleteFileSchema.safeParse(await request.json());

  if (!result.success) {
    return NextResponseZODError(result.error);
  }

  try {
    await deleteFileFromSftpServer(result.data);
    return NextResponse.json({
      success: true,
      url: result.data.url,
    });
  } catch (error) {
    return NextResponseServerError();
  }
}
