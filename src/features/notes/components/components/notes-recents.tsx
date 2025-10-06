import { Button } from "@/core/components/ui/button";
import { Upload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/core/components/ui/tooltip";
import { api } from "@/trpc/server";
import NoteCardRecents from "./note-card-recents";

export default async function NotesRecents() {
  const { getNotes } = api.note;
  const notes = await getNotes();

  return (
    <section className="mx-auto w-4/5 space-y-8 p-3">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-semibold text-zinc-600 dark:text-zinc-200">
          Notas Recentes
        </p>

        <Tooltip>
          <TooltipTrigger>
            <Button className="cursor-pointer" variant="ghost" size="icon">
              <Upload className="!h-5 !w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-200">
              Upload
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {notes.map((note, index) => (
          <NoteCardRecents className="!min-h-64" note={note} key={index} />
        ))}
      </div>
    </section>
  );
}
