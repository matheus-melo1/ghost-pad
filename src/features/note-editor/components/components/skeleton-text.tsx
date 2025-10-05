import { cn } from "@/core/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function SkeletonText() {
  const [parent] = useAutoAnimate();
  function generateNumber(): number {
    const min = 80;
    const max = 100;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 28 }).map((_, i) => {
        const width = generateNumber();

        return (
          <div
            key={i}
            ref={parent}
            className={cn(
              `h-5 animate-pulse rounded-[24px] bg-zinc-400 transition-all dark:bg-zinc-600`,
            )}
            style={{ width: `${width}%` }}
          ></div>
        );
      })}
    </div>
  );
}
