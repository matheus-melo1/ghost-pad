"use server";

import {
  actionError,
  actionSuccess,
  type PromiseActionResult,
} from "@/core/lib/actions/action-result";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { revalidatePath } from "next/cache";

export async function createNewNoteEmpty(): PromiseActionResult<{
  id: string;
}> {
  try {
    const ctx = await createTRPCContext();
    const caller = appRouter.createCaller(ctx);

    const note = await caller.note.createNoteEmpty();

    revalidatePath("/notes");

    return actionSuccess({ id: note.id }, "Nota criada com sucesso");
  } catch {
    return actionError("Não foi possível criar a nota");
  }
}
