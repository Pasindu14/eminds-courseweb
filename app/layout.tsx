import type { Metadata } from "next";
import {
  Cabin,
  Heebo,
  Inter,
  Jost,
  Oswald,
  Roboto_Condensed,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers";
const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eminds",
  description: "Eminds Academy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className} suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
