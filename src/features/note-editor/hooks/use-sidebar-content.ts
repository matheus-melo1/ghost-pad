import { api } from "@/trpc/server";

export const useSidebarContent = () => {
  const { deleteNoteById } = api.note;

  const onDeleteNote = async (noteId: string) => {
    await deleteNoteById({ id: noteId });
  };

  return {
    onDeleteNote,
  };
};
