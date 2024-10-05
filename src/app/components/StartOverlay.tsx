import Button from "./Button";

export default function StartOverlay({
  display,
  setDisplay,
}: {
  display: boolean;
  setDisplay: (d: boolean) => void;
}) {
  return (
    <div className="w-screen h-screen bg-black/70 text-center flex flex-col justify-center">
      <h1 className="text-[128px]">The Atlas Project</h1>
      <h2 className="text-[32px]">Your personal Atlas through the stars</h2>
      <div className="flex flex-col items-center justify-center mt-8">
        <Button onClick={() => setDisplay(!display)}>Get started</Button>
      </div>
    </div>
  );
}
