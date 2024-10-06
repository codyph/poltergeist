"use client";

import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ButtonProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  hoverChildren?: React.ReactNode;
}

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0.5 },
};

const Button = ({ active, onClick, children, hoverChildren }: ButtonProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        "cursor-pointer border-2 rounded-xl bg-transparent hover:bg-black h-full font-bold py-4 px-4 text-center align-middle",
        active ? "border-orange-600 text-orange-600" : "border-white text-white"
      )}
      animate={hovered || !hoverChildren ? "open" : "closed"}
      variants={variants}
    >
      {!hovered || !hoverChildren ? children : hoverChildren}
    </motion.div>
  );
};

export default Button;
