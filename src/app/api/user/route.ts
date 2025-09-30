import { NextRequest, NextResponse } from "next/server";
import prismadata from "../utils/prismadata";
import  cookies  from "js-cookie";

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const getCook =  cookies.get("userTokenId");
    console.log("get cookieas userka xogtiisa waa",getCook)
    // const { user } = await prismadata();
    // const userData = JSON.parse(getCook?.value as string);
    // const infoDat = {
    //   userId: userData.id,
    //   exp: new Date(userData.exp * 1000).toLocaleString(),
    // };

    // const account = await user.findUnique({
    //   where: { id: Number(infoDat.userId) },
    //   omit: { password: true },
    // });

    return NextResponse.json({mes:"welcome guysy 2"});
  } catch (error) {
    console.log("error is:", error);
    return NextResponse.json(error, { status: 500 });
  }
}
