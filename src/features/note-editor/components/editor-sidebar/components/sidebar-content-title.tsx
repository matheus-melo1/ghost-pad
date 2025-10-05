"use client";

import { Button } from "@/core/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/core/components/ui/tooltip";
import { createNewNoteEmpty } from "@/core/lib/actions/shared/create-note-empty";
import { Archive, BookOpenText, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function SidebarContentTitle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const archived = searchParams.get("archived");

  const onCreateEmptyNote = async () => {
    const result = await createNewNoteEmpty();

    if (!result.success) {
      toast.error("Não foi possível criar a nota");
      return;
    }

    router.push(`/notes/${result.data.id}`);
    toast.success("Nota criada com sucesso");
  };

  const onClickArchived = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("archived", archived === "true" ? "false" : "true");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex w-full items-center justify-between px-1">
      <h1 className="text-xl font-semibold">
        {archived === "true" ? "Arquivados" : "Suas Notas"}
      </h1>

      <div className="flex items-center gap-0">
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={onClickArchived}
              size={"sm"}
            >
              {archived === "false" || !archived ? (
                <Archive />
              ) : (
                <BookOpenText />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>
              {archived === "false" || !archived ? "Notas arquivadas" : "Todos"}
            </span>
          </TooltipContent>
        </Tooltip>

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
    </div>
  );
}
