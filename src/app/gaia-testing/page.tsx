"use client";

import useSWR from "swr";
import React from "react";

export type GaiaDataRequest = {
  pl_ra: string,
  pl_dec: string,
  pl_dist: string,
};

export default function GaiaDataFetcher(pl_ra: number, pl_dec: number, pl_dist: number) {
  const fetcher = async (url: string, args: GaiaDataRequest) => {
    const params = new URLSearchParams(args);
    return fetch(`${url}?${params}`)
      .then((r) => r.json())
      .then((j) => j.data.data);
  };

  const requestArgs = {
    pl_ra: "351.7717763", // deg
    pl_dec: "-1.2853435", // deg
    pl_dist: "29.661", // pc
  }

  const { data, error, isLoading } = useSWR(
    ["/fetch-stars", requestArgs],
    ([url, request]) => fetcher(url, request)
  );

  // return data

  return (
    <div>
      {error ? (
        `Error: ${error}`
      ) : isLoading ? (
        `Fetching stars...`
      ) : (
        <>
          <h1>Gaia DR3 Data</h1>
          <ul>
            {data &&
              data.map((star: number[], index: number) => (
                <li key={index}>
                  Source ID: {star[0]}, RA: {star[1]}, Dec: {star[2]}
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
