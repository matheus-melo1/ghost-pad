import React from "react";
import { Inter } from "next/font/google";

const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

interface IAppPageProps {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: IAppPageProps) {
  return (
    <main className={`${interSans.className} h-full w-full`}>{children}</main>
  );
}
