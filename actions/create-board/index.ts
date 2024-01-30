"use server"

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { getIspro, hasAvailableCount, incrementAvailableCount } from "@/lib/org-limit";

const handler =async (data:InputType):Promise<ReturnType> => {
    const {userId,orgId}= auth();
    if(!userId || !orgId){
        return{
            error:"Unauthorised",
        }
    }
    const canCreate=await hasAvailableCount()
    const isPro = await getIspro()
    if(!canCreate && !isPro){
        return {
            error:"Limit reached.Update Plan"
        }
    }
const {title,image}=data;
const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName
  ] = image.split("|");

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
    return {
      error: "Missing fields. Failed to create board."
    };
  }

let board;
try {
    board= await db.board.create({
        data: {
            title,
            orgId,
            imageId,
            imageThumbUrl,
            imageFullUrl,
            imageUserName,
            imageLinkHTML,
          }
    })
    if(!isPro){
        await incrementAvailableCount()

    }
    await createAuditLog({
        entityTitle: board.title,
        entityId: board.id,
        entityType: ENTITY_TYPE.BOARD,
        action: ACTION.CREATE,
      })
} catch (error) {
    return {
        error:"Failed to Create"
    }
}
revalidatePath(`board/${board.id}`)
    return {data:board}
}

export const createBoard= createSafeAction(CreateBoard,handler)