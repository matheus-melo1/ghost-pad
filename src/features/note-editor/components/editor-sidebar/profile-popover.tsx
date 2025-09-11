"use client";

import SwitchTheme from "@/core/components/customize/switch-theme";
import { Button } from "@/core/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";
import { User } from "lucide-react";

interface ProfilePopoverProps {
  children?: React.ReactNode;
}

export default function ProfilePopover({ children }: ProfilePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="flex w-32 flex-col gap-1 p-1">
        <Button
          variant="ghost"
          className="flex w-full justify-start font-semibold"
        >
          <User />
          Perfil
        </Button>
        <div className="w-full justify-center py-1">
          <SwitchTheme />
        </div>
        {/* <Button */}
        {/*   variant="ghost" */}
        {/*   onClick={onLogout} */}
        {/*   className="flex w-full justify-start font-semibold" */}
        {/* > */}
        {/*   <DoorOpen /> */}
        {/*   Sair */}
        {/* </Button> */}
      </PopoverContent>
    </Popover>
  );
}
