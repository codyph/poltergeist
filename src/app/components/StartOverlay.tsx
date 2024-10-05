import Button from "./Button";

export default function StartOverlay({
  display,
  setDisplay,
}: {
  display: boolean;
  setDisplay: (d: boolean) => void;
}) {
  return (
    <div className="w-screen h-screen bg-black/70 text-center flex flex-col justify-center px-8">
      <h1 className="text-[48px] sm:text-[72px] md:text-[96px] leading-tight">The Atlas Project</h1>
      <h2 className="text-[24px] sm:text-[28px] md:text-[32px] mt-4 sm:mt-2 md:mt-0">Your personal Atlas through the stars</h2>
      <div className="flex flex-col items-center justify-center mt-6">
        <Button onClick={() => setDisplay(!display)}>Get started</Button>
      </div>
    </div>
  );
}
