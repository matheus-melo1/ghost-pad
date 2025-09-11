import { cn } from "@/core/lib/tiptap-utils";
import { Ghost } from "lucide-react";
import { DM_Sans, Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  weight: "400",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: "400",
});

export default function AuthBanner() {
  return (
    <div className="relative w-full">
      <div className="absolute top-3 left-3 flex items-center gap-3">
        <Ghost strokeWidth={1.2} className="h-10 w-10 text-white" />
        <p className={cn(libreBaskerville.className, "text-2xl text-white")}>
          GhostPad
        </p>
      </div>

      <img
        src="https://applescoop.org/image/wallpapers/mac/dark-mode-night-mode-minimalist-mountains-landscape-top-rated-most-downloaded-free-download-wallpapers-for-macbook-pro-and-macbook-air-and-microsoft-windows-desktop-pcs-4k-07-12-2024-1733638609-hd-wallpaper.webp"
        className="h-full w-full object-cover"
      />

      <p
        className={cn(
          dmSans.className,
          "absolute bottom-8 left-4 text-4xl font-semibold text-zinc-200",
        )}
      >
        Faça anotações & documentações.
      </p>
    </div>
  );
}
