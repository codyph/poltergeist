"use client";

import useSWR from "swr";

import { Exoplanet } from "../fetch-exoplanets/route";
import Button from "./Button";
import PlanetCard from "./PlanetCard";
import { SearchInput } from "./SearchInput";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaShuffle } from "react-icons/fa6";

export type ExoplanetDataRequest = {
  query: string;
  filter: string;
  start: string;
  num: string;
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
  const [selectedPlanet, setSelectedPlanet] = useState<Exoplanet | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [resultList, setResultList] = useState<Exoplanet[]>([]);
  const [requestArgs, setRequestArgs] = useState<ExoplanetDataRequest>({
    query: "",
    filter: "",
    start: "0",
    num: "20",
  });
  const debouncedRequestArgs = useDebounce<ExoplanetDataRequest>(
    requestArgs,
    300
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRequestArgs({
      query: e.target.value,
      filter: "",
      start: "0",
      num: "20",
    });
  };

  const fetcher = async (url: string, args: ExoplanetDataRequest) => {
    const params = new URLSearchParams(args);
    const res = await fetch(`${url}?${params}`).then((r) => r.json());

    return res;
  };

  const { data, error, isLoading } = useSWR<
    { data: Exoplanet[]; hasMore: boolean },
    Error,
    [string, ExoplanetDataRequest]
  >(["/fetch-exoplanets", debouncedRequestArgs[0]], ([url, request]) =>
    fetcher(url, request)
  );

  useEffect(() => {
    if (parseInt(requestArgs.start) != 0) {
      setResultList([...resultList, ...(data?.data || [])]);
    } else {
      setResultList(data?.data || []);
    }
    if (data?.hasMore) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [data]);

  return (
    <div className="w-screen h-screen bg-black/95 text-center flex flex-col items-center justify-center px-8 overflow-hidden">
      <div className="flex flex-col items-start w-full max-w-[500px] h-full max-h-[80vh] justify-between">
        <div className="flex flex-col items-start w-full h-full overflow-hidden">
          <div className="flex flex-col items-start mb-4 sm:mb-6 w-full">
            <span className="mb-2">Current planet</span>
            <div className="w-full px-4">
              <PlanetCard planet={planet} />
            </div>
          </div>
          <div className="flex flex-col items-start mb-4 w-full h-full overflow-hidden">
            <span className="mb-1">Search planets</span>
            <div className="mb-3 w-full">
              <SearchInput handleChange={handleSearchChange} />
            </div>
            <div className="text-left w-full h-full overflow-y-auto scrollbar">
              {error ? (
                `Error: ${error}`
              ) : isLoading && resultList.length == 0 ? (
                `Loading...`
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  {resultList &&
                    resultList.map((planet, index) => (
                      <div
                        className="px-4 pt-2"
                        onClick={() => setSelectedPlanet(planet)}
                        key={planet.pl_name}
                      >
                        <PlanetCard
                          planet={planet}
                          selected={planet.pl_name == selectedPlanet?.pl_name}
                          clickable
                        />
                      </div>
                    ))}
                  {hasMore && (
                    <div
                      key="Load more"
                      className="p-2 cursor-pointer hover:text-orange-600"
                      onClick={() =>
                        setRequestArgs({
                          ...requestArgs,
                          start: (
                            parseInt(requestArgs.start) +
                            parseInt(requestArgs.num)
                          ).toString(),
                        })
                      }
                    >
                      Load more...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 w-full text-sm">
          <Button onClick={() => setDisplay(false)}>Cancel</Button>
          <div className="flex items-center gap-4">
            {selectedPlanet && !(selectedPlanet.pl_name == planet.pl_name) ? (
              <Button
                onClick={() => {
                  if (selectedPlanet) {
                    setPlanet(selectedPlanet);
                  }
                  setDisplay(false);
                  return;
                }}
              >
                Go
              </Button>
            ) : null}
            <Button
              onClick={() => {
                setPlanet(
                  resultList[Math.floor(Math.random() * resultList.length)]
                );
                setDisplay(false);
                return;
              }}
            >
              <span className="flex whitespace-nowrap">
                Surprise me{"\u00a0"}
                <FaShuffle size={20} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
