"use server";

import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { revalidatePath } from "next/cache";
import {
  actionError,
  actionSuccess,
  type PromiseActionResult,
} from "../action-result";

export async function deleteNote(
  id: string,
): PromiseActionResult<{ id: string }> {
  try {
    const ctx = await createTRPCContext();
    const caller = appRouter.createCaller(ctx);

    const note = await caller.note.deleteNoteById({ id });

    revalidatePath("/notes");

    return actionSuccess({ id: note.id }, "Nota deletada com sucesso");
  } catch {
    return actionError("Não foi possível deletar a nota");
  }
}
