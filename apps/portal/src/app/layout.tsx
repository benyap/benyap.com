import clsx from "clsx";
import { Inter, Roboto_Mono } from "next/font/google";

import { Firebase } from "~/components/Firebase";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(inter.variable, roboto_mono.variable)}>
      <body className="bg-brand-white text-brand-black">
        <Firebase />
        {children}
      </body>
    </html>
  );
}
