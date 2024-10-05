import Button from "./components/Button";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-[128px]">The Atlas Project</h1>
      <h2 className="text-[32px]">Your personal Atlas through the stars</h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <Button>Pick a Planet</Button>
        <Button>Look around</Button>
      </div>
    </div>
  );
}
