"use client";

import { useState } from "react";
import useSWR from "swr";
import { getStars } from "../api/gaia";

export default function GaiaDataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = 0;

  const {
    data: starsData,
    error: starsError,
    isLoading: starsIsLoading,
  } = useSWR(["Get stars", id], ([key, id]) => getStars(id));

  console.log(starsData, starsError, starsIsLoading);

  return (
    <div>
      {starsError
        ? `Error: ${starsData}`
        : starsIsLoading
        ? "Loading..."
        : "Success!"}
      {/* <h1>Gaia DR3 Data</h1>
      <ul>
        {data && data.map((star, index) => (
          <li key={index}>
            Source ID: {star[0]}, RA: {star[1]}, Dec: {star[2]}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
