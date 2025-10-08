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
  content: string;
}

export async function changeContentNote({
  id,
  content,
}: IChangeTitleNote): PromiseActionResult<{
  id: string;
  content: string;
}> {
  try {
    const ctx = await createTRPCContext();
    const caller = appRouter.createCaller(ctx);

    await caller.note.changeContentNote({ id, content });

    revalidatePath("/notes");
    revalidatePath(`/notes/${id}`);
    return actionSuccess({ id, content }, "Nota editada com sucesso");
  } catch {
    return actionError("Não foi possível editar o nome da nota");
  }
}
