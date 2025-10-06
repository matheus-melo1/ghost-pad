"use client";

import { cn } from "@/core/lib/utils";
import type { NoteType } from "@/core/models/schemas/note.schema";
import {
  Archive,
  ArchiveX,
  EllipsisVertical,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNoteCard } from "../../hooks/use-note-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";
import { Button } from "@/core/components/ui/button";

interface IDocumentCardProps {
  className?: string;
  onClick?: () => void;
  note: NoteType;
}

export default function NoteCardRecents({
  className,
  note,
}: IDocumentCardProps) {
  const {
    isOpen,
    setIsOpen,
    onDeleteNote,
    onClickPopover,
    onClickArchived,
    onChangeNote,
  } = useNoteCard(note);

  return (
    <div
      onClick={() => onChangeNote(note.id, note.archived)}
      className={cn(className, "flex h-full flex-col gap-3")}
    >
      <div className="hover:border-primary/50 ease flex h-full w-full cursor-pointer flex-col items-center justify-between rounded-md border-2 duration-100 dark:border-zinc-600 dark:hover:border-zinc-400">
        <div className="relative flex h-full w-full items-center justify-center rounded-t-md">
          {note.archived && (
            <div className="absolute top-3 left-3 rounded-[8px] bg-zinc-100 p-2 dark:bg-zinc-800">
              <Archive className="text-muted-foreground h-5 w-5" />
            </div>
          )}
          <FileText className="text-muted-foreground h-10 w-10" />
        </div>
        <div className="flex h-fit w-full items-center justify-between rounded-b-md bg-zinc-50 px-3 py-2 dark:bg-zinc-800">
          <p className="text-base font-medium text-zinc-600 dark:text-zinc-200">
            {note.title}
          </p>

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
                onClick={(ev) =>
                  onClickArchived(ev, !note.archived ? true : false)
                }
              >
                {!note.archived ? <Archive /> : <ArchiveX />}
                {!note.archived ? "Arquivar" : "Desarquivar"}
              </Button>
              <Button
                onClick={(event) => onDeleteNote(event, note.id)}
                variant="ghost"
                className="flex w-full cursor-pointer justify-start gap-3 font-semibold"
              >
                <Trash2 />
                Apagar
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* { */}
      {/*   <p className="truncate px-1 text-sm font-medium text-zinc-600 dark:text-zinc-200"> */}
      {/*     {note.title} */}
      {/*   </p> */}
      {/* } */}
    </div>
  );
}
