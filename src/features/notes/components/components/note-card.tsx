import { cn } from "@/core/lib/utils";

interface IDocumentCardProps {
  children?: React.ReactNode;
  label?: string;
  className?: string;
  onClick?: () => void;
}

export default function NoteCard({
  children,
  label,
  className,
  onClick,
}: IDocumentCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(className, "flex h-full flex-col gap-3")}
    >
      <div className="hover:border-primary/50 hover:bg-muted/10 ease flex h-full w-full cursor-pointer items-center justify-center rounded-md border-2 p-3 duration-100 dark:border-zinc-600 dark:hover:border-zinc-400 dark:hover:bg-zinc-800">
        {children}
      </div>
      {
        <p className="truncate px-1 text-sm font-medium text-zinc-600 dark:text-zinc-200">
          {label}
        </p>
      }
    </div>
  );
}
