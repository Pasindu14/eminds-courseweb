import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eminds",
  description: "Eminds Academy",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className} suppressHydrationWarning={true}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
