"use client";

import useSWR from "swr";

import { Exoplanet } from "../fetch-exoplanets/route";
import Button from "./Button";

export type ExoplanetDataRequest = {
  query: string;
  filter: string;
};

export default function SelectPlanet({
  display,
  setDisplay,
  planet,
  setPlanet,
}: {
  display: boolean;
  setDisplay: (d: boolean) => void;
  planet: Exoplanet;
  setPlanet: (p: Exoplanet) => void;
}) {
  const fetcher = async (url: string, args: ExoplanetDataRequest) => {
    const params = new URLSearchParams(args);
    const res = await fetch(`${url}?${params}`)
      .then((r) => r.json())
      .then((j) => j.data);

    return res;
  };

  const requestArgs = {
    query: "98",
    filter: "",
  };

  const { data, error, isLoading } = useSWR<
    Exoplanet[],
    Error,
    [string, ExoplanetDataRequest]
  >(["/fetch-exoplanets", requestArgs], ([url, request]) =>
    fetcher(url, request)
  );

  return (
    <div className="w-screen h-screen bg-black/70 text-center flex flex-col items-center justify-center px-8">
      <div>Current planet: {planet.pl_name}</div>
      <div>Select Planet...:</div>
      {error ? (
        `Error: ${error}`
      ) : isLoading ? (
        `Asking for: ${requestArgs.query}, ${requestArgs.filter}...`
      ) : (
        <>
          <ul>
            {data &&
              data.map((planet: Exoplanet, index: number) => (
                <li key={index} onClick={() => setPlanet(planet)}>
                  {planet.pl_name} (Hostname: {planet.hostname}, Year:{" "}
                  {planet.disc_year})
                </li>
              ))}
          </ul>
        </>
      )}
      <div className="flex flex-col items-center justify-center mt-6 text-sm">
        <Button onClick={() => setDisplay(!display)}>Close</Button>
      </div>
    </div>
  );
}
