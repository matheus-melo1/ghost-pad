import { createNewNoteEmpty } from "@/core/lib/actions/shared/create-note-empty";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useNoteTemplate = () => {
  const router = useRouter();

  const onCreateNewNoteEmpty = async () => {
    const result = await createNewNoteEmpty();

    if (!result.success) {
      toast.error("Não foi possível criar a nota");
      return;
    }

    const { id } = result.data;

    toast.success("Nota criada com sucesso!");
    router.push(`/notes/${id}`);
  };

  return {
    onCreateNewNoteEmpty,
  };
};
