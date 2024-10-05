"use client";

import useSWR from "swr";

export type GaiaDataRequest = {
  num: string;
};

export default function GaiaDataFetcher() {
  const fetcher = async (url: string, args: GaiaDataRequest) => {
    const params = new URLSearchParams(args);
    return fetch(`${url}?${params}`)
      .then((r) => r.json())
      .then((j) => j.data.data);
  };

  const requestArgs = {
    num: "5"
  }

  const { data, error, isLoading } = useSWR(
    ["/fetch-stars", requestArgs],
    ([url, request]) => fetcher(url, request)
  );

  return (
    <div>
      {error ? (
        `Error: ${error}`
      ) : isLoading ? (
        `Fetching ${requestArgs.num} stars...`
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
