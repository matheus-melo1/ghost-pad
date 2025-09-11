import AppPage from "@/core/components/layout/app-page";
import AuthSection from "@/features/auth/components/auth-section";
import { DM_Sans } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: "400",
});

export default function Auth() {
  return (
    <TRPCReactProvider>
      <AppPage className={dmSans.className}>
        <AuthSection />
      </AppPage>
    </TRPCReactProvider>
  );
}
