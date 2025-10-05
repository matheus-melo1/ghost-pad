import { api } from "@/trpc/server";
import type { NoteEditorParams } from "../../models/params-id.type";
import NoteCard from "./components/note-card";
import ListAnimated from "@/core/components/customize/list-animated";
import SidebarContentTitle from "./components/sidebar-content-title";
import { Suspense } from "react";
import NoteCardSkeleton from "./note-card-skeleton";
import { FileX2 } from "lucide-react";
import { cn } from "@/core/lib/utils";

export async function EditorSidebarContent(props: NoteEditorParams) {
  const { params, searchParams } = props;
  const { noteId } = params;
  const { archived } = searchParams;
  const { getNotes } = api.note;

  const notes = await getNotes();
  const filteredNotes = notes.filter((note) =>
    archived === "true" ? note.archived : !note.archived,
  );

  return (
    <div className="mt-4 flex h-full w-full flex-col gap-6 overflow-y-auto p-2">
      <SidebarContentTitle />

      <ListAnimated
        className={cn(
          notes.length === 0 && "items-center justify-center",
          "flex h-full w-full flex-col gap-2",
        )}
      >
        <Suspense fallback={<NoteCardSkeleton />}>
          {filteredNotes.length === 0 ? (
            <div className="mt-5 flex flex-col items-center justify-center gap-4">
              <FileX2 className="!h-10 !w-10 text-zinc-200 dark:text-zinc-600" />
              <h1 className="text-lg text-zinc-300 dark:text-zinc-600">
                Não existem notas
              </h1>
            </div>
          ) : (
            filteredNotes.map((note) => {
              const selected = note.id === noteId;

              return <NoteCard key={note.id} note={note} selected={selected} />;
            })
          )}
        </Suspense>
      </ListAnimated>
    </div>
  );
}
