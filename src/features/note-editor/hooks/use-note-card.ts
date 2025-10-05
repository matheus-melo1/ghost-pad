import { deleteNote } from "@/core/lib/actions/shared/delete-note";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { archiveNote } from "@/core/lib/actions/shared/archive-note";
import type { NoteType } from "@/core/models/schemas/note.schema";
import toast from "react-hot-toast";

export const useNoteCard = (note: NoteType) => {
  const searchParams = useSearchParams();
  const archived = searchParams.get("archived") ?? "false";
  const [isOpen, setIsOpen] = useState(false);

  const onDeleteNote = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    noteId: string,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    await deleteNote(noteId);
    redirect(`/notes/empty?archived=${archived ?? "false"}`);
  };

  const onChangeNote = async (noteId: string) => {
    redirect(`/notes/${noteId}?archived=${archived ?? "false"}`);
  };

  const onClickPopover = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const onClickArchived = async (isArchived: boolean) => {
    const result = await archiveNote({ id: note.id, isArchived });
    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success(
      archived === "false" ? "Nota arquivada" : "Nota desarquivada",
    );
  };

  return {
    isOpen,
    setIsOpen,
    onDeleteNote,
    onChangeNote,
    onClickPopover,
    onClickArchived,
    archived,
  };
};

export type useNoteCardType = ReturnType<typeof useNoteCard>;
