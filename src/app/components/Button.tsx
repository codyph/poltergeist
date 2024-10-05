"use client";

import React from "react";
import { useState } from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  hoverChildren?: React.ReactNode;
}

const Button = ({ onClick, children, hoverChildren }: ButtonProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-2 rounded-xl border-white bg-transparent hover:bg-black h-full text-white font-bold py-4 px-4 text-center align-middle"
    >
      {!hovered || !hoverChildren ? children : hoverChildren}
    </div>
  );
};

export default Button;
