import { NextResponse, type NextRequest } from "next/server";
import { uploadFile } from "~/utils/sftp-engine";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();

  const file: File | null = formData.get("file") as unknown as File;
  const dir: string | null = formData.get("dir") as string;
  const isPublic: string | null = formData.get("public") as string;
  const filename: string | null = formData.get("filename") as string;

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

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const path = await uploadFile(
      buffer,
      dir,
      filename,
      isPublic === "true" ? true : false,
    );
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
