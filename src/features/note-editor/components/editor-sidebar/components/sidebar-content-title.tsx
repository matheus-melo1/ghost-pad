"use client";

import { Button } from "@/core/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/core/components/ui/tooltip";
import { createNewNoteEmpty } from "@/core/lib/actions/shared/create-note-empty";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SidebarContentTitle() {
  const router = useRouter();

  const onCreateEmptyNote = async () => {
    const result = await createNewNoteEmpty();

    if (!result.success) {
      toast.error("Não foi possível criar a nota");
      return;
    }

    router.push(`/notes/${result.data.id}`);
    toast.success("Nota criada com sucesso");
  };

  return (
    <div className="flex w-full items-center justify-between px-1">
      <h1 className="text-xl font-semibold">Suas Notas</h1>

      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={async () => await onCreateEmptyNote()}
            variant="ghost"
            className="cursor-pointer"
            size={"sm"}
          >
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Criar Nota</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
