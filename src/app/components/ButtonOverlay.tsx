import Button from "./Button";
import { IoPlanet } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

export default function ButtonOverlay({
  displaySelectPlanet,
  setDisplaySelectPlanet,
}: {
  displaySelectPlanet: boolean;
  setDisplaySelectPlanet: (d: boolean) => void;
}) {
  return (
    <div className="bg-transparent text-center flex flex-col items-start gap-4 justify-between">
      <div className="text-sm">
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
      <div className="text-sm">
        <Button
          onClick={() => null}
          hoverChildren={
            <span className="flex whitespace-nowrap">
              <BsStars size={20} />
              {"\u00a0"}Constellations
            </span>
          }
        >
          <BsStars size={20}/>
        </Button>
      </div>
    </div>
  );
}
