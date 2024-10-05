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
      className={`antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className={`${overpass_mono.className} h-screen overflow-x-hidden`}>
        <div className="flex min-h-[calc(100dvh)] md:min-h-[calc(100dvh)] flex-col">
          <main className="mx-auto mt-6 flex w-full items-center justify-center pb-3 md:mt-10">
            <div className="container mx-[8%] w-full px-0 lg:px-[2rem]">
              {children}
            </div>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
