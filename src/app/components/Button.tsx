"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <div className="bg-blue-500 hover:bg-blue-700 w-48 h-16 text-white font-bold py-2 px-4 rounded text-center align-middle">
      {children}
    </div>
  );
};

export default Button;
