import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
 
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const upgrade=  await db.orgLimit.upsert({
        where: { orgId },
        update: { count: 10000,isPro: true }, 
        create: { orgId, count: 10000 } 
        
      });
   

    return NextResponse.json(upgrade!!);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}