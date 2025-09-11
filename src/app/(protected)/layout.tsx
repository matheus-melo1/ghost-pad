import AppLayout from "@/core/components/layout/app-layout";
import type { ReactNode } from "react";
import NotSession from "./_components/not-session";
import { auth } from "auth";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return <NotSession />;
  }

  return <AppLayout>{children}</AppLayout>;
}
