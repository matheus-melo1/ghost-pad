"use client";

import { useAuth } from "../hooks/use-auth";
import AuthBanner from "./auth-banner";
import AuthLogin from "./auth-login";
import AuthRegister from "./auth-register";

export default function AuthSection() {
  const methods = useAuth();
  const { type } = methods;

  return (
    <section className="grid h-screen w-full grid-cols-[30%_70%]">
      <AuthBanner />

      {type === "login" ? (
        <AuthLogin {...methods} />
      ) : (
        <AuthRegister {...methods} />
      )}
    </section>
  );
}
