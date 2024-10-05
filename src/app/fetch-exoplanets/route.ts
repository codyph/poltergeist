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
  ra?: number;
  dec?: number;
  sy_dist?: number;
  sy_disterr1?: number;
  sy_disterr2?: number;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const filter = searchParams.get("filter");

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
    // Implement your filter logic here
    // Example: results = results.filter(item => item.category === filter);
  }

  return Response.json({ data });
}
