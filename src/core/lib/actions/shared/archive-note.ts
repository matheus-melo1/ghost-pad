"use server";

import {
  actionError,
  actionSuccess,
  type PromiseActionResult,
} from "@/core/lib/actions/action-result";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { revalidatePath } from "next/cache";

interface IArchiveNote {
  id: string;
  isArchived: boolean;
}

export async function archiveNote({
  id,
  isArchived,
}: IArchiveNote): PromiseActionResult<{
  id: string;
  isArchived: boolean;
}> {
  try {
    const ctx = await createTRPCContext();
    const caller = appRouter.createCaller(ctx);

    await caller.note.archiveNoteById({ id, isArchived });

    revalidatePath("/notes");
    // revalidatePath(`/notes/${id}?archived=false`);
    return actionSuccess({ id, isArchived }, "Nota arquivada com sucesso");
  } catch {
    return actionError("Não foi possível arquivar a nota");
  }
}
