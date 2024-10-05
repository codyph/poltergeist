import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="absolute bottom-0 z-10 mt-auto flex w-full items-center justify-center">
      <div className="container text-xs md:text-sm mx-[8%] flex w-full items-center justify-between gap-4 px-0 py-4 lg:px-[2rem]">
        <div className="flex flex-col self-end h-[100%]">
          <div className="whitespace-nowrap">
            &copy; 2024-present Poltergeist
          </div>
        </div>
        <div className="flex flex-col items-end text-foreground whitespace-nowrap">
          <a href="mailto:theatlasproject@gmail.com">
            theatlasproject@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
