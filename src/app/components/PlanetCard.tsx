import { Exoplanet } from "../fetch-exoplanets/route";
import clsx from "clsx";

export default function PlanetCard({
  planet,
  clickable,
  selected,
}: {
  planet: Exoplanet;
  clickable?: boolean;
  selected?: boolean,
}) {
  return (
    <div
      className={clsx(
        "w-full flex flex-col items-start border-2 rounded-lg py-2 px-4",
        clickable && "hover:border-orange-600 cursor-pointer",
        selected ? "border-orange-600 text-orange-600" :  "border-white text-white"
      )}
    >
      <div className="text-lg">{planet.pl_name}</div>
      <div className="text-sm text-white/50">{planet.hostname}</div>
    </div>
  );
}
