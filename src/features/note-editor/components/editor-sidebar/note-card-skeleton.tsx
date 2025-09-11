export default function NoteCardSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <div key={index} className="flex h-full w-full flex-col gap-3">
      <div className="flex h-full w-full animate-pulse items-center justify-between rounded-sm border-2 p-4 duration-100 dark:border-zinc-600 dark:hover:border-zinc-400 dark:hover:bg-zinc-800">
        <div className="flex w-full items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-zinc-200 dark:bg-zinc-600" />

          <div className="h-3 w-full rounded-md bg-zinc-200 dark:bg-zinc-600" />
        </div>
      </div>
    </div>
  ));
}
