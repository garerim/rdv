import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header/Header";
import { cn } from "@/lib/utils";
import { SocketProvider } from "@/components/provider/socket-provider";
import { GlobaleProvider } from "@/components/provider/globale-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gestion RDV",
  description: "Plateforme de gestion des rendez-vous",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "h-full")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobaleProvider>
            <SocketProvider>
              <Header />
              <div className="relative pt-[100px] w-full h-full">
                {children}
              </div>
            </SocketProvider>
          </GlobaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
