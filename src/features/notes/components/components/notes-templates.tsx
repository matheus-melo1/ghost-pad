"use client";

import { Plus, ListChecks, CalendarCheck2, PenTool } from "lucide-react";
import NoteCard from "./note-card";
import { useNoteTemplate } from "../../hooks/use-note-template";

export default function NotesTemplates() {
  const { onCreateNewNoteEmpty } = useNoteTemplate();

  return (
    <div className="mx-auto flex h-full max-w-4/5 flex-col gap-5">
      <h1 className="text-2xl font-semibold text-zinc-600 dark:text-zinc-100">
        Notas
      </h1>

      <div className="grid h-4/5 w-full grid-cols-5 gap-5">
        <NoteCard onClick={onCreateNewNoteEmpty} label="Documento em branco">
          <Plus className="text-muted-foreground h-10 w-10" />
        </NoteCard>

        <NoteCard label="Template checklist">
          <ListChecks className="text-muted-foreground h-10 w-10" />
        </NoteCard>

        <NoteCard label="Rotina / Habit Tracker">
          <CalendarCheck2 className="text-muted-foreground h-10 w-10" />
        </NoteCard>

        <NoteCard label="Desenhe um diagrama">
          <PenTool className="text-muted-foreground h-10 w-10" />
        </NoteCard>
      </div>
    </div>
  );
}
