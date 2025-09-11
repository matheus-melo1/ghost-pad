import { cn } from "@/core/lib/utils";

export default function AppPage({
  children,
  className,
  header,
  navbar,
  appPageClassName,
}: {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  appPageClassName?: string;
  navbar?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        appPageClassName,
        navbar && "!flex-row",
        "flex h-full w-full flex-col",
      )}
    >
      {header && <div className="sticky top-0 z-10 w-full">{header}</div>}
      {navbar && (
        <div
          data-slot="sidebar"
          className={cn(
            "bg-sidebar text-sidebar-foreground flex h-screen w-[380px] flex-col border-r p-1",
          )}
        >
          {navbar}
        </div>
      )}

      <div className={cn(className, "h-full w-full")}>{children}</div>
    </section>
  );
}
