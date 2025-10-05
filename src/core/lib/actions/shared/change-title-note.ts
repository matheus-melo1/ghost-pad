"use server";

import {
  actionError,
  actionSuccess,
  type PromiseActionResult,
} from "@/core/lib/actions/action-result";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { revalidatePath } from "next/cache";

interface IChangeTitleNote {
  id: string;
  title: string;
}

export async function changeTitleNote({
  id,
  title,
}: IChangeTitleNote): PromiseActionResult<{
  id: string;
  title: string;
}> {
  try {
    const ctx = await createTRPCContext();
    const caller = appRouter.createCaller(ctx);

    await caller.note.changeTitleNote({ id, title });

    revalidatePath("/notes");
    return actionSuccess({ id, title }, "Nota editada com sucesso");
  } catch {
    return actionError("Não foi possível editar o nome da nota");
  }
}
