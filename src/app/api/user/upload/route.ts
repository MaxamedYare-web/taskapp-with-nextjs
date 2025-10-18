import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function PUT(req: NextRequest) {
  const upload_dir = path.resolve(process.env.ROOT_PATH ?? "", "profile");
  const url_api_image = `${process.env.URL_IMG}=${process.env.api_key_img}`;

  try {
    const formDataFile = await req.formData();

    if (!formDataFile) {
      return NextResponse.json(
        { error: "file not found please try to choose file" },
        { status: 401 }
      );
    }

    const body = Object.fromEntries(formDataFile);
    const file = (body.file as Blob) || null;


    const buffer = Buffer.from(await file.arrayBuffer());
    const fileImage = buffer.toString("base64");
    fs.mkdirSync(upload_dir, { recursive: true });
    fs.writeFileSync(
      path.resolve(upload_dir, (body.file as File).name),
      buffer
    );

    const formAppend = new FormData();
    formAppend.append("image", fileImage);
    const resImg = await fetch(url_api_image, {
      method: "POST",
      body: formAppend,
    });

    const dataImage = await resImg.json();

    return NextResponse.json(
      {
        success: true,
        message: "Successfully the profile was updated",
        display_url: dataImage.data.display_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: `there is error with uploading image: ${
          (error as Error).message
        }`,
      },
      { status: 500 }
    );
  }
}
