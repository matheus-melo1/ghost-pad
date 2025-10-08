"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/components/ui/avatar";
import { Button } from "@/core/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";
import { DoorOpen, User } from "lucide-react";
import { useNotePopover } from "../../hooks/use-note-popover";

export default function NotesPopover() {
  const { onLogout } = useNotePopover();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="h-10 w-10">
          <AvatarImage
            className="object-cover"
            src="https://i.pinimg.com/originals/e8/5d/db/e85ddba8a747c4e8c885fa05e4ac3cd7.gif"
          />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="mt-2 mr-3 flex w-32 flex-col gap-1 p-1">
        <Button
          variant="ghost"
          className="flex w-full justify-start font-semibold"
        >
          <User />
          Perfil
        </Button>
        <Button
          variant="ghost"
          onClick={onLogout}
          className="flex w-full justify-start font-semibold"
        >
          <DoorOpen />
          Sair
        </Button>
      </PopoverContent>
    </Popover>
  );
}
