import { NextResponse, type NextRequest } from "next/server";
import {
  deleteFileFromSftpServer,
  uploadFileToSftpServer,
} from "~/utils/sftp/sftp-engine";
const containsOnlyOnePunctuation = /^[^\p{P}]*[\p{P}][^\p{P}]*$/u;
export interface SftpApiResponse {
  error?: string;
  message?: string;
  status: number;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();

  const file: File | null = formData.get("file") as unknown as File;
  const dir: string | null = formData.get("dir") as string;
  const isPublic: string | null = formData.get("public") as string;
  const filename: string | null = formData.get("filename") as string;
  const overwrite: string | null = formData.get("overwrite") as string;

  if (!file || !dir || !isPublic || !filename) {
    return NextResponse.json(
      {
        error: "Missing required formdata fields",
      },
      {
        status: 400,
      },
    );
  }

  if (
    filename.includes("/") ||
    filename.includes("\\") ||
    !containsOnlyOnePunctuation.test(filename)
  ) {
    return NextResponse.json(
      {
        error: `Filename ${filename} contains invalid characters.`,
      },
      {
        status: 400,
      },
    );
  }

  const overwriteFile = overwrite === "true" ? true : false;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const path = await uploadFileToSftpServer({
      input: buffer,
      dir,
      filename,
      isPublic: isPublic === "true" ? true : false,
      overwrite: overwriteFile,
    });
    return NextResponse.json({ success: true, message: path });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json(
        {
          error: "Something went wrong.",
        },
        {
          status: 400,
        },
      );
    }
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl.searchParams.get("url") as string;

  if (!url || typeof url !== "string") {
    return NextResponse.json(
      {
        error: "Missing required query parameter: url",
      },
      {
        status: 400,
      },
    );
  }

  try {
    await deleteFileFromSftpServer(url);
    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json(
        {
          error: "Something went wrong.",
        },
        {
          status: 400,
        },
      );
    }
  }
}
