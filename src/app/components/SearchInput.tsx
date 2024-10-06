"use client";

import { ChangeEvent, ChangeEventHandler } from "react";
import { IoTelescopeOutline } from "react-icons/io5";

export function SearchInput({
  handleChange,
}: {
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="w-full flex shrink items-center border-white border-2 px-3 py-1 rounded-lg">
      <IoTelescopeOutline size={20} />
      <input
        className="mb-[1px] ml-2 mt-[5px] w-full min-w-[120px] bg-black/50 placeholder:text-white placeholder:opacity-50 focus:outline-none"
        placeholder="Search..."
        onChange={handleChange}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     const params = new URLSearchParams();
        //     //@ts-ignore
        //     params.set("s", e.target.value);
        //     router.push(`search?${params.toString()}`);
        //   }
        // }}
      />
    </div>
  );
}
