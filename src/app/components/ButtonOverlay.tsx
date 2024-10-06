import Button from "./Button";
import { IoPlanet } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { IoHelp } from "react-icons/io5";

export default function ButtonOverlay({
  displaySelectPlanet,
  setDisplaySelectPlanet,
  showConstellations,
  setShowConstellations,
  showHelp,
  setShowHelp,
}: {
  displaySelectPlanet: boolean;
  setDisplaySelectPlanet: (d: boolean) => void;
  showConstellations: boolean;
  setShowConstellations: (d: boolean) => void;
  showHelp: boolean;
  setShowHelp: (d: boolean) => void;
}) {
  return (
    <div className="bg-transparent pl-8 pt-8 pb-16 text-center flex flex-col items-start justify-between">
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
        <div className="text-sm flex">
          <Button
            onClick={() => setShowHelp(!showHelp)}
            hoverChildren={
              <span className="flex whitespace-nowrap">
                <IoHelp size={20} />
                {"\u00a0"}Help
              </span>
            }
          >
            <IoHelp size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
