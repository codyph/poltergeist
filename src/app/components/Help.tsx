import Button from "./Button";
import { AiOutlineDrag } from "react-icons/ai";
import { HiCursorClick } from "react-icons/hi";
import { IoPlanet } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

export default function Help({
  display,
  setDisplay,
}: {
  display: boolean;
  setDisplay: (d: boolean) => void;
}) {
  return (
    <div className="w-screen h-screen bg-black/95 text-center flex flex-col items-center justify-center px-8">
      <div className="flex flex-col items-start w-full max-w-[500px] justify-between">
        <div className="flex flex-col items-start w-full h-full">
          <h1 className="text-lg sm:text-2xl font-bold mb-8">Atlas Help</h1>
          <div className="flex flex-col gap-8">
          <div className="flex items-center w-full gap-4 sm:gap-6">
            <AiOutlineDrag size={48}/>
            <div className="text-left">Click and drag to explore the planet's sky.</div>
          </div>
          <div className="flex items-center w-full gap-4 sm:gap-6">
            <HiCursorClick size={48}/>
            <div className="text-left">Hover and click on a star to learn more.</div>
          </div>
          <div className="flex items-center w-full gap-4 sm:gap-6">
            <IoPlanet size={48}/>
            <div className="text-left">Search through NASA's catalogue of exoplanets.</div>
          </div>
          <div className="flex items-center w-full gap-4 sm:gap-6">
            <BsStars size={48}/>
            <div className="text-left">Toggle visibility of the constellations.</div>
          </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-8 w-full text-sm">
          <Button onClick={() => setDisplay(false)}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
