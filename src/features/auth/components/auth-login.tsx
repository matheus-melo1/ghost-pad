import { InputForm } from "@/core/components/form/input-form";
import { Key, Mail } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import type { useAuthType } from "../domain/use-auth";

export default function AuthLogin(props: useAuthType) {
  const { formHook, onSubmit, onChangeType, isLoading } = props;
  const { control, handleSubmit } = formHook;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="space-y-1 text-center">
        <p className="text-3xl font-semibold text-zinc-800 dark:text-zinc-200">
          Bem vindo de volta!
        </p>
        <p className="mb-5 text-lg text-zinc-800 dark:text-zinc-400">
          Faça login para continuar.
        </p>
      </div>

      <InputForm
        name="email"
        control={control}
        label="Email"
        placeholder="Digite o Email"
        type="email"
        className="w-96"
        icon={Mail}
      />

      <InputForm
        name="password"
        control={control}
        label="Senha"
        placeholder="Digite a Senha"
        type="password"
        className="w-96"
        icon={Key}
      />

      <Button
        onClick={handleSubmit(onSubmit)}
        className="!ronded-2xl mt-4 w-96 cursor-pointer py-6 text-lg font-semibold"
        loading={isLoading}
      >
        Entrar
      </Button>

      <p className="mt-2 text-center text-zinc-800 dark:text-zinc-400">
        Não tem uma conta?
        <span className="text-zinc-600 dark:text-zinc-200">
          {" "}
          <span
            onClick={() => onChangeType("register")}
            className="cursor-pointer underline hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            Cadastre-se
          </span>
        </span>
        .
      </p>
    </div>
  );
}
