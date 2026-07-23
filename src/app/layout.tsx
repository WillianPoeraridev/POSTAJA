import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/posthog-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Cadência — A estratégia do seu Instagram, pronta pra usar",
  description:
    "Cada post com uma função: atrair, criar confiança, vender. Montado pro seu negócio, todo mês, sem você precisar pensar a estratégia.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-neutral-950 text-white">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
