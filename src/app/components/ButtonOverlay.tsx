import Button from "./Button";
import { IoPlanet } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import PlanetCard from "./PlanetCard";
import { Exoplanet } from "../fetch-exoplanets/route";

export default function ButtonOverlay({
  currentPlanet,
  displaySelectPlanet,
  setDisplaySelectPlanet,
  showConstellations,
  setShowConstellations,
}: {
  currentPlanet: Exoplanet;
  displaySelectPlanet: boolean;
  setDisplaySelectPlanet: (d: boolean) => void;
  showConstellations: boolean;
  setShowConstellations: (d: boolean) => void;
}) {
  return (
    <div className="bg-transparent h-[100dvh] pl-8 pt-8 pb-16 text-center flex flex-col items-start justify-between">
      <div className="flex flex-col gap-4">
        <div className="text-sm flex">
          <Button
            onClick={() => setDisplaySelectPlanet(!displaySelectPlanet)}
            hoverChildren={
              <span className="flex whitespace-nowrap">
                <IoPlanet size={20} />
                {"\u00a0"}Planets
              </span>
            }
          >
            <IoPlanet size={20} />
          </Button>
        </div>
        <div className="text-sm flex">
          <Button
            active={showConstellations}
            onClick={() => setShowConstellations(!showConstellations)}
            hoverChildren={
              <span className="flex whitespace-nowrap">
                <BsStars size={20} />
                {"\u00a0"}Constellations
              </span>
            }
          >
            <BsStars size={20} />
          </Button>
        </div>
      </div>
      <div className="flex">
        <PlanetCard planet={currentPlanet} />
      </div>
    </div>
  );
}
