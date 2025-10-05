"use client";

import type { NoteType } from "@/core/models/schemas/note.schema";
import {
  Archive,
  ArchiveX,
  EllipsisVertical,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";
import clsx from "clsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";
import { Button } from "@/core/components/ui/button";
import { useNoteCard } from "@/features/note-editor/hooks/use-note-card";

interface INoteProps {
  note: NoteType;
  selected: boolean;
}

export default function NoteCard({ note, selected }: INoteProps) {
  const {
    isOpen,
    setIsOpen,
    onDeleteNote,
    onChangeNote,
    onClickPopover,
    onClickArchived,
    archived,
  } = useNoteCard(note);

  return (
    <div
      key={note.id}
      className={clsx(
        selected && "bg-black/10 dark:bg-white/10",
        "flex cursor-pointer items-center justify-between !rounded-sm p-2 transition-all hover:bg-black/10 dark:hover:bg-white/10",
      )}
      onClick={() => onChangeNote(note.id)}
    >
      <div className="flex items-center gap-2">
        <FileText />
        <p>{note.title}</p>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <Button onClick={onClickPopover} variant="ghost" size={"sm"}>
            <EllipsisVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-32 flex-col gap-1 p-1">
          <Button
            variant="ghost"
            className="flex w-full justify-start gap-3 font-semibold"
          >
            <Pencil />
            Editar
          </Button>
          <Button
            variant="ghost"
            className="flex w-full justify-start gap-3 font-semibold"
            onClick={() =>
              onClickArchived(archived === "false" || !archived ? true : false)
            }
          >
            {archived === "false" ? <Archive /> : <ArchiveX />}
            {archived === "false" ? "Arquivar" : "Desarquivar"}
          </Button>
          <Button
            onClick={(event) => onDeleteNote(event, note.id)}
            variant="ghost"
            className="flex w-full justify-start gap-3 font-semibold"
          >
            <Trash2 />
            Apagar
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
