import { useForm } from "react-hook-form";
import {
  authSchema,
  type AuthSchemaType,
  type AuthType,
} from "../models/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

const formInitialValues: AuthSchemaType = {
  email: "",
  password: "",
};

export const useAuth = () => {
  const { create: useCreateUser } = api.user;
  const { mutateAsync: registerUser, isError: isErrorRegister } =
    useCreateUser.useMutation();
  const router = useRouter();

  const [type, setType] = useState<AuthType>("login");
  const [isLoading, setIsLoading] = useState(false);

  const formHook = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema(type)),
    values: formInitialValues,
  });
  const { reset } = formHook;

  const toggleLoading = () => setIsLoading((prev) => !prev);

  const onRegister = async (data: AuthSchemaType) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Senhas não coincidem!");
      toggleLoading();
      return;
    }

    await registerUser(data);

    if (isErrorRegister) {
      toast.error("Erro ao criar usuário!");
      toggleLoading();
      return;
    }

    toast.success("Usuário criado com sucesso!");
    toggleLoading();
    onChangeType("login");
  };

  const onSubmit = async (data: AuthSchemaType) => {
    toggleLoading();
    if (type === "login") {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error("Email ou senha inválidos!");
        toggleLoading();
        return;
      }

      toggleLoading();
      router.push("/notes");
      toast.success("Login com sucesso!");
      return;
    }

    await onRegister(data);
  };

  const onChangeType = (type: AuthType) => {
    setType(type);
    reset(formInitialValues);
  };

  return {
    formHook,
    onSubmit,
    type,
    onChangeType,
    isLoading,
  };
};

export type useAuthType = ReturnType<typeof useAuth>;
