import { Exoplanet } from "../fetch-exoplanets/route";
import clsx from "clsx";
import { motion } from "framer-motion";

function extractHref(inputString: string) {
  const hrefRegex = /href=(https?:\/\/[^\s>"]+)/;
  const match = inputString.match(hrefRegex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null; // or you could return a message like "No href found"
  }
}

export default function PlanetCard({
  planet,
  clickable,
  selected,
}: {
  planet: Exoplanet;
  clickable?: boolean;
  selected?: boolean;
}) {
  if (planet.habitable) {
    return (
      <motion.div
        animate={{
          boxShadow: ["0 0 2px #ffd700", "0 0 14px #ffd700", "0 0 2px #ffd700"],
        }}
        transition={{
          duration: 1.5,
          ease: "easeIn",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
        className={clsx(
          "w-full flex items-center gap-8 justify-between border-2 rounded-lg py-2 px-4 bg-black/30",
          clickable && "hover:border-orange-600 cursor-pointer",
          selected
            ? "border-orange-600 text-orange-600"
            : "border-white text-white"
        )}
      >
        <div className="flex flex-col items-start self-start">
          <div className="text-lg">{planet.pl_name}</div>
          <div className="text-sm text-white/50">Star: {planet.hostname}</div>
        </div>
        <div className="flex flex-col h-full justify-between items-end">
          <div className="text-sm text-[#ffd700]">
            {planet.pl_name == "Earth" ? "Habitable" : "Potentially habitable"}
          </div>
          <div className="text-sm">
            Mass: {planet.pl_bmasse.toFixed(1)} Earths
          </div>
          <div className="text-sm">
            Radius: {planet.pl_rade.toFixed(1)} Earths
          </div>
          {!clickable ? (
            <>
              <div className="text-sm">
                Gravity:{" "}
                {(planet.pl_bmasse * (1 / planet.pl_rade) ** 2).toFixed(1)}g
              </div>
              {planet.pl_refname && (
                <a
                  target="_blank"
                  className="text-sm underline"
                  href={extractHref(planet.pl_refname) || ""}
                >
                  Learn more!
                </a>
              )}
            </>
          ) : null}
        </div>
      </motion.div>
    );
  } else {
    return (
      <div
        className={clsx(
          "w-full flex items-center gap-8 justify-between border-2 rounded-lg py-2 px-4 bg-black/30",
          clickable && "hover:border-orange-600 cursor-pointer",
          selected
            ? "border-orange-600 text-orange-600"
            : "border-white text-white"
        )}
      >
        <div className="flex flex-col items-start self-start">
          <div className="text-lg">{planet.pl_name}</div>
          <div className="text-sm text-white/50">Star: {planet.hostname}</div>
        </div>
        <div className="flex flex-col h-full justify-between items-end">
          <div className="text-sm">
            Mass: {planet.pl_bmasse.toFixed(1)} Earths
          </div>
          <div className="text-sm">
            Radius: {planet.pl_rade.toFixed(1)} Earths
          </div>
          {!clickable ? (
            <>
              <div className="text-sm">
                Gravity:{" "}
                {(planet.pl_bmasse * (1 / planet.pl_rade) ** 2).toFixed(1)}g
              </div>
              {planet.pl_refname && (
                <a
                  target="_blank"
                  className="text-sm underline"
                  href={extractHref(planet.pl_refname) || ""}
                >
                  Learn more!
                </a>
              )}
            </>
          ) : null}
        </div>
      </div>
    );
  }
}
