"use client";

import SwitchTheme from "@/core/components/customize/switch-theme";
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
import { SidebarTrigger } from "@/core/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/core/components/ui/tooltip";
import { cn } from "@/core/lib/utils";
import { DoorOpen, Ghost, History, User, UsersRound } from "lucide-react";
import { Libre_Baskerville } from "next/font/google";
import { useRouter } from "next/navigation";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  weight: "400",
});

export default function EditorHeader() {
  const router = useRouter();

  const onChangeRoute = () => {
    router.push(`/documents`);
  };

  return (
    <header className="bg-background sticky top-0 z-10 flex w-full items-center justify-between border-b px-8 py-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Button
          onClick={onChangeRoute}
          className="cursor-pointer"
          variant="ghost"
          size={"icon"}
        >
          <Ghost strokeWidth={1.2} className="!h-9 !w-9" />
        </Button>

        <p className={cn(libreBaskerville.className, "text-2xl")}>
          Documento Sem Título
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size={"icon"}>
              <History className="!h-5 !w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Hístorico</TooltipContent>
        </Tooltip>
        <Button>
          <UsersRound />
          Convidar Amigos
        </Button>

        <SwitchTheme />

        <Popover>
          <PopoverTrigger>
            <Avatar className="h-10 w-10">
              <AvatarImage
                className="object-cover"
                src="https://gifsec.com/wp-content/uploads/2022/10/cute-anime-girl-11.gif"
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
              Profile
            </Button>
            <Button
              variant="ghost"
              className="flex w-full justify-start font-semibold"
            >
              <DoorOpen />
              Exit
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
