"use client";

import useSWR from "swr";

export default function GaiaDataFetcher() {
  
  const fetcher = (url: string, num: number) =>
    fetch(`${url}?num=${num}`)
      .then((r) => r.json())
      .then((j) => j.data.data);

  const numStars = 5;

  const { data, error, isLoading } = useSWR(
    ["/fetch-stars", numStars],
    ([url, num]) => fetcher(url, num)
  );

  return (
    <div>
      {error ? (
        `Error: ${error}`
      ) : isLoading ? (
        `Fetching ${numStars} stars...`
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
