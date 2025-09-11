import SwitchTheme from "@/core/components/customize/switch-theme";
import { Input } from "@/core/components/ui/input";
import { cn } from "@/core/lib/utils";
import { Ghost, Search } from "lucide-react";
import { Libre_Baskerville } from "next/font/google";
import NotesPopover from "./components/note-popover";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  weight: "400",
});

export default function NotesHeader() {
  return (
    <header className="bg-background flex w-full items-center justify-between border-b px-8 py-4">
      <div className="flex items-center gap-3">
        <Ghost strokeWidth={1.2} className="h-10 w-10" />
        <p className={cn(libreBaskerville.className, "text-2xl")}>GhostPad</p>
      </div>

      <div className="relative w-[36rem]">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search..."
          className="rounded-full !p-6 !pl-11 !text-base"
        />
      </div>

      <div className="flex items-center gap-4">
        <SwitchTheme />

        <NotesPopover />
      </div>
    </header>
  );
}
