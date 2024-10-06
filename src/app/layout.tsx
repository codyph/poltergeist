import type { Metadata } from "next";
import { Overpass_Mono } from "next/font/google";
import { SiteFooter } from "./components/footer";

const overpass_mono = Overpass_Mono({
  subsets: ["latin"],
  display: "swap",
});
import "./globals.css";

export const metadata: Metadata = {
  title: "The Atlas Project",
  description: "Your personal Atlas to the stars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`antialiased overflow-x-hidden select-none`}
      suppressHydrationWarning
    >
      <body className={`${overpass_mono.className} h-screen overflow-x-hidden`}>
        <main className="flex flex-col items-center justify-center w-full px-0">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
