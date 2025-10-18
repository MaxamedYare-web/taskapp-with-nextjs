import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prismadata from "../utils/prismadata";


export async function GET(_req: NextRequest) {
 
  try {
  const userId = (await headers()).get("userDataId")
    const { user } = await prismadata();
    const account = await user.findUnique({
      where: { id: Number(userId) },
      omit: { password: true},
    });

    return NextResponse.json({success:true,account},{status:200});
  } catch (error) {

    return NextResponse.json({error:`there is error with fetching data ${(error as Error).message}`}, { status: 500 });
  }
}
