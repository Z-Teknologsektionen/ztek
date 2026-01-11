"use server";
import { NextResponse, type NextRequest } from "next/server";
import {
  sftpDeleteFileCheckIfOnServerSchema,
  sftpDeleteFileSchema,
  sftpRenameFileCheckIfOnServerSchema,
  sftpRenameFileSchema,
  sftpUploadNewFileSchema,
} from "~/schemas/sftp";
import type { NextSFTPAPIResponseWithUrl } from "~/types/sftp-types";
import {
  deleteFileFromSftpServer,
  renameFileOnSftpServer,
  uploadFileToSftpServer,
} from "./utils/sftp-engine";
import {
  flattenZodError,
  makeSftpAPIErrorResponse,
  SftpAPIError,
} from "./utils/sftp-helpers";

export async function POST(request: NextRequest): NextSFTPAPIResponseWithUrl {
  try {
    // parse request
    const parsedRequest = sftpUploadNewFileSchema.safeParse(
      Object.fromEntries(await request.formData()),
    );
    if (!parsedRequest.success) {
      throw new SftpAPIError(
        "CLIENT_ERR__INVALID_REQUEST",
        `Ogiltig HTTP-förfrågan:\n ${flattenZodError(parsedRequest.error)}`,
      );
    }

    // upload file
    const bytes = await parsedRequest.data.file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const url = await uploadFileToSftpServer({
      input: buffer,
      ...parsedRequest.data,
    });

    // answer
    return NextResponse.json({ success: true, url });
  } catch (error) {
    return makeSftpAPIErrorResponse(error);
  }
}

export async function PUT(request: NextRequest): NextSFTPAPIResponseWithUrl {
  try {
    // parse request
    const body = await request.json();
    const parsedRequest = sftpRenameFileSchema.safeParse(body);
    if (!parsedRequest.success) {
      throw sftpRenameFileCheckIfOnServerSchema.safeParse(body).success
        ? new SftpAPIError(
            "CLIENT_ERR__FILE_NOT_ON_SERVER",
            `Given URL pekar inte på servern`,
          )
        : new SftpAPIError(
            "CLIENT_ERR__INVALID_REQUEST",
            `Ogiltig HTTP-förfrågan:\n ${flattenZodError(parsedRequest.error)}`,
          );
    }

    // rename file
    const url = await renameFileOnSftpServer(parsedRequest.data);

    // answer
    return NextResponse.json({ success: true, url });
  } catch (error) {
    return makeSftpAPIErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest): NextSFTPAPIResponseWithUrl {
  try {
    // parse request
    const body = await request.json();
    const parsedRequest = sftpDeleteFileSchema.safeParse(body);
    if (!parsedRequest.success) {
      throw sftpDeleteFileCheckIfOnServerSchema.safeParse(body).success
        ? new SftpAPIError(
            "CLIENT_ERR__FILE_NOT_ON_SERVER",
            `Given URL pekar inte på servern`,
          )
        : new SftpAPIError(
            "CLIENT_ERR__INVALID_REQUEST",
            `Ogiltig HTTP-förfrågan:\n ${flattenZodError(parsedRequest.error)}`,
          );
    }

    // delete file
    await deleteFileFromSftpServer(parsedRequest.data);

    // answer
    return NextResponse.json({
      success: true,
      url: parsedRequest.data.url,
    });
  } catch (error) {
    return makeSftpAPIErrorResponse(error);
  }
}
