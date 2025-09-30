import { NextRequest, NextResponse } from "next/server";
import prismadata from "../utils/prismadata";
import { cookies } from "next/headers";

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const getCook = (await cookies()).get("user");
    const { user } = await prismadata();
    const userData = JSON.parse(getCook?.value as string);
    const infoDat = {
      userId: userData.id,
      exp: new Date(userData.exp * 1000).toLocaleString(),
    };

    const account = await user.findUnique({
      where: { id: Number(infoDat.userId) },
      omit: { password: true },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.log("error is:", error);
    return NextResponse.json(error, { status: 500 });
  }
}
