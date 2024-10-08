import { type NextRequest } from "next/server";
import exoplanets from "../../../public/exoplanets_filtered.json";

export type Exoplanet = {
  pl_name: string;
  hostname: string;
  sy_snum: number;
  sy_pnum: number;
  sy_mnum: number;
  disc_year?: number;
  disc_facility?: string;
  pl_refname?: string;
  pl_orbper: string;
  pl_orbpererr1?: string;
  pl_orbpererr2?: string;
  pl_orbperlim?: number;
  pl_rade: number;
  pl_radeerr1?: number;
  pl_radeerr2?: number;
  pl_radelim?: number;
  pl_bmasse: number;
  pl_bmasseerr1?: number;
  pl_bmasseerr2?: number;
  pl_bmasselim?: number;
  pl_eqt: number;
  pl_eqterr1?: number;
  pl_eqterr2?: number;
  pl_eqtlim?: number;
  st_teff: number;
  st_tefferr1?: number;
  st_tefferr2?: number;
  st_tefflim?: number;
  ra: number;
  dec: number;
  sy_dist: number;
  sy_disterr1?: number;
  sy_disterr2?: number;
  habitable: boolean;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const filter = searchParams.get("filter");
  const start = searchParams.get("start");
  const num = searchParams.get("num");

  let data = exoplanets;

  if (query) {
    data = data.filter((item) => {
      return (
        item.pl_name.toLowerCase().includes(query.toLowerCase()) ||
        item.hostname.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  if (filter) {
    // Implement filter logic here
    // Example: results = results.filter(item => item.category === filter);
  }

  const maxNum = data.length;

  let hasMore = true;

  let end = parseInt(start || "0") + parseInt(num || "20");

  if (end > maxNum) {
    end = maxNum;
    hasMore = false;
  }

  data = data.slice(parseInt(start || "0"), end);

  return Response.json({ data, hasMore });
}
