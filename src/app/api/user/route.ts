import { NextRequest, NextResponse } from "next/server";
import prismadata from "../utils/prismadata";
import { cookies, headers } from "next/headers";


export async function GET(req: NextRequest, _res: NextResponse) {
 
  try {
  const decoded = (await headers()).get("userDataId")
  const userId = JSON.parse(decoded as any)
    const { user } = await prismadata();
    const account = await user.findUnique({
      where: { id: Number(userId.id) },
      omit: { password: true },
    });

    return NextResponse.json({success:true,account},{status:200});
  } catch (error) {

    return NextResponse.json({error:`there is error with fetching data ${(error as Error).message}`}, { status: 500 });
  }
}
