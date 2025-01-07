import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import { NextUIProvider } from "@nextui-org/system";

export const metadata: Metadata = {
  title: "Next.js Starter",
  description: "Next.js Starter",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen bg-black font-sans antialiased flex justify-center items-center", fontSans.variable)}>
        <NextUIProvider>
          <main className="dark text-foreground">{children}</main>
        </NextUIProvider>
      </body>
    </html>
  );
}
