"use client";

import { Button } from "@/core/components/ui/button";
import { Bug } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <Bug className="!h-20 !w-20 text-zinc-200 dark:text-zinc-600" />
      <h1 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-200">
        Ops! Algo deu errado.
      </h1>
      <p className="text-lg text-zinc-800 dark:text-zinc-400">
        {error.message}
      </p>
      <p className="text-lg text-zinc-800 dark:text-zinc-400">
        Tente novamente mais tarde.
      </p>
      <Button
        onClick={() => router.push("/notes")}
        className="mt-4 w-96 cursor-pointer !rounded-2xl py-6 text-lg font-semibold"
      >
        Voltar
      </Button>
    </main>
  );
}
