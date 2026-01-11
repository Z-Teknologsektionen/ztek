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
  makeSftpAPIErrorResponse,
  parseSftpAPIRequest,
} from "./utils/sftp-helpers";

export async function POST(request: NextRequest): NextSFTPAPIResponseWithUrl {
  try {
    // parse request
    const parsedRequest = await parseSftpAPIRequest({
      request,
      schema: sftpUploadNewFileSchema,
      formData: true,
    });

    // upload file
    const bytes = await parsedRequest.file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const url = await uploadFileToSftpServer({
      input: buffer,
      ...parsedRequest,
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
    const parsedRequest = await parseSftpAPIRequest({
      request,
      schema: sftpRenameFileSchema,
      checkIfFileOnServerSchema: sftpRenameFileCheckIfOnServerSchema,
    });

    // rename file
    const url = await renameFileOnSftpServer(parsedRequest);

    // answer
    return NextResponse.json({ success: true, url });
  } catch (error) {
    return makeSftpAPIErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest): NextSFTPAPIResponseWithUrl {
  try {
    // parse
    const parsedRequest = await parseSftpAPIRequest({
      request,
      schema: sftpDeleteFileSchema,
      checkIfFileOnServerSchema: sftpDeleteFileCheckIfOnServerSchema,
    });

    // delete file
    await deleteFileFromSftpServer(parsedRequest);

    // answer
    return NextResponse.json({
      success: true,
      url: parsedRequest.url,
    });
  } catch (error) {
    return makeSftpAPIErrorResponse(error);
  }
}
