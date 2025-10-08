import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/components/ui/avatar";
import { Button } from "@/core/components/ui/button";
import { SidebarFooter } from "@/core/components/ui/sidebar";
import { cn } from "@/core/lib/tiptap-utils";
import { Ghost, SlidersVertical } from "lucide-react";
import { Libre_Baskerville } from "next/font/google";
import ProfilePopover from "./profile-popover";
import { EditorSidebarContent } from "./sidebar-content";
import type { NoteEditorParams } from "../../models/params-id.type";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-libre-baskerville",
});

export function EditorSidebar(props: NoteEditorParams) {
  return (
    <section className="flex h-full w-full flex-col justify-between">
      <div className="flex items-center gap-3 p-3">
        <Ghost strokeWidth={1.2} className="h-8 w-8" />
        <p className={cn(libreBaskerville.className, "text-xl")}>GhostPad</p>
      </div>

      <EditorSidebarContent {...props} />

      <SidebarFooter>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                className="object-cover"
                src="https://i.pinimg.com/originals/e8/5d/db/e85ddba8a747c4e8c885fa05e4ac3cd7.gif"
              />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <p className="text-lg font-medium">User</p>
          </div>
          <ProfilePopover>
            <Button className="cursor-pointer" variant="ghost" size={"icon"}>
              <SlidersVertical strokeWidth={1.2} className="!h-5 !w-5" />
            </Button>
          </ProfilePopover>
        </div>
      </SidebarFooter>
    </section>
  );
}
