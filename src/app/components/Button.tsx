"use client";

import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="border-2 rounded-xl border-white bg-transparent hover:bg-black w-48 h-full text-white text-xl font-bold py-5 px-4 text-center align-middle"
    >
      {children}
    </div>
  );
};

export default Button;
