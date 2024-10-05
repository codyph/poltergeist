"use client";

import { useState } from "react";
import StartOverlay from "./components/StartOverlay";
import { motion, AnimatePresence } from "framer-motion";
import ViewPlaceholder from "./components/ViewPlaceholder";

export default function Home() {
  const [displayStartOverlay, setDisplayStartOverlay] = useState<boolean>(true);

  return (
    <div className="relative flex flex-col items-center w-screen h-screen">
      <AnimatePresence>
        {displayStartOverlay ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 2,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 1,
              },
            }}
            className="absolute z-10"
          >
            <StartOverlay
              display={displayStartOverlay}
              setDisplay={setDisplayStartOverlay}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <ViewPlaceholder/>
    </div>
  );
}
