import { NextResponse, type NextRequest } from "next/server";
import {
  sftpDeleteFileSchema,
  sftpRenameFileSchema,
  sftpUploadNewFileSchema,
} from "~/schemas/sftp";
import {
  deleteFileFromSftpServer,
  renameFileOnSftpServer,
  uploadFileToSftpServer,
} from "~/utils/sftp/sftp-engine";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await sftpUploadNewFileSchema.safeParseAsync(
    Object.fromEntries(await request.formData()),
  );

  if (!formData.success) {
    return NextResponse.json(
      {
        error: { message: `Invalid input: ${formData.error.toString()}` },
      },
      {
        status: 400,
      },
    );
  }

  const { dir, file, filename, isPublic, overwrite } = formData.data;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const path = await uploadFileToSftpServer({
      input: buffer,
      dir,
      filename,
      isPublic,
      overwrite,
    });

    return NextResponse.json({ success: true, message: path });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const formData = await sftpRenameFileSchema.safeParseAsync(
    await request.json(),
  );

  if (!formData.success) {
    return NextResponse.json(
      {
        error: `Invalid input: ${formData.error.toString()}`,
      },
      {
        status: 400,
      },
    );
  }

  const { newName, oldUrl } = formData.data;

  try {
    const path = await renameFileOnSftpServer({
      oldUrl,
      filename: newName,
    });
    return NextResponse.json({ success: true, message: path });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const formData = await sftpDeleteFileSchema.safeParseAsync(
    await request.json(),
  );

  if (!formData.success) {
    return NextResponse.json(
      {
        error: `Invalid input: ${formData.error.toString()}`,
      },
      {
        status: 400,
      },
    );
  }

  try {
    await deleteFileFromSftpServer(formData.data.url);
    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}
