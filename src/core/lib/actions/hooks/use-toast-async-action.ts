import toast from "react-hot-toast";
import type { PromiseActionResult } from "../action-result";

export const useToastAsyncAction = async <T>(
  action: PromiseActionResult<T>,
  options?: {
    loadingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
  },
) => {
  const result = await toast.promise(action, {
    loading: options?.loadingMessage ?? "Processando...",
    success: (result) =>
      result.success
        ? (result?.message ?? "Sucesso!")
        : (options?.successMessage ?? "Sucesso!"),
    error: options?.errorMessage ?? "Erro!",
  });

  return result;
};
