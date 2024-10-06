"use client";

import useSWR from "swr";
import React from "react";
import { Exoplanet } from "../fetch-exoplanets/route";

export type ExoplanetDataRequest = {
  query: string;
  filter: string;
};

export default function ExoplanetDataFetcher() {
  const fetcher = async (url: string, args: ExoplanetDataRequest) => {
    const params = new URLSearchParams(args);
    const res = await fetch(`${url}?${params}`)
    .then((r) => r.json())
    .then((j) => j.data)

    return res;
  };

  const requestArgs = {
    query: "9827",
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
    <div>
      {error ? (
        `Error: ${error}`
      ) : isLoading ? (
        `Asking for: ${requestArgs.query}, ${requestArgs.filter}...`
      ) : (
        <>
          <h1>Exoplanet Data</h1>
          <ul>
            {data &&
              data.map((planet: Exoplanet, index: number) => (
                <li key={index}>
                  Planet name: {planet.pl_name}, Hostname: {planet.hostname},
                  Year: {planet.disc_year}
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
