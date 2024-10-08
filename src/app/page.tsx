"use client";

import { useEffect, useState } from "react";
import StartOverlay from "./components/StartOverlay";
import { motion, AnimatePresence } from "framer-motion";
import SkyViewer from "./components/SkyViewer";
import SelectPlanet from "./components/SelectPlanet";
import ButtonOverlay from "./components/ButtonOverlay";
import { Exoplanet } from "./fetch-exoplanets/route";
import useSWR from "swr";
import Help from "./components/Help";
import PlanetCard from "./components/PlanetCard";

export type GaiaDataRequest = {
  ra: string;
  dec: string;
  sy_dist: string;
};

export default function Home() {
  const [displayStartOverlay, setDisplayStartOverlay] = useState<boolean>(true);
  const [displaySelectPlanet, setDisplaySelectPlanet] =
    useState<boolean>(false);
  const [displayHelp, setDisplayHelp] = useState<boolean>(true);
  const [showConstellations, setShowConstellations] = useState<boolean>(false);
  const [planet, setPlanet] = useState<Exoplanet>({
    pl_name: "Earth",
    hostname: "Sol",
    sy_snum: 1,
    sy_pnum: 8,
    sy_mnum: 1,
    pl_orbper: "365.2425",
    pl_rade: 1,
    pl_bmasse: 1,
    pl_eqt: 255,
    st_teff: 5780,
    ra: 0,
    dec: 0,
    sy_dist: 0,
    habitable: true,
  });

  // console.log(showConstellations)

  const fetcher = async (url: string, args: GaiaDataRequest) => {
    const params = new URLSearchParams(args);
    return fetch(`${url}?${params}`)
      .then((r) => r.json())
      .then((j) => j.data.data);
  };

  // const { data, error, isLoading } = useSWR(
  //   [
  //     "/fetch-stars",
  //     {
  //       ra: planet.ra.toString(),
  //       dec: planet.dec.toString(),
  //       sy_dist: planet.sy_dist.toString(),
  //     },
  //   ],
  //   ([url, request]) => fetcher(url, request)
  // );

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
      <AnimatePresence>
        {!displayStartOverlay ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            }}
            className="absolute z-10 self-start"
          >
            <ButtonOverlay
              displaySelectPlanet={displaySelectPlanet}
              setDisplaySelectPlanet={setDisplaySelectPlanet}
              showConstellations={showConstellations}
              setShowConstellations={setShowConstellations}
              showHelp={displayHelp}
              setShowHelp={setDisplayHelp}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {!displayStartOverlay ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            }}
            className="absolute bottom-0 z-10 self-start"
          >
            <div className="bg-transparent pl-8 pb-16 text-center flex flex-col items-start justify-end">
              <PlanetCard planet={planet} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {displaySelectPlanet ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            }}
            className="absolute z-10"
          >
            <SelectPlanet
              display={displaySelectPlanet}
              setDisplay={setDisplaySelectPlanet}
              planet={planet}
              setPlanet={setPlanet}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {displayHelp && !displayStartOverlay ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            }}
            className="absolute z-10"
          >
            <Help display={displayHelp} setDisplay={setDisplayHelp} />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <SkyViewer planet={planet} showConstellations={showConstellations} />
    </div>
  );
}
