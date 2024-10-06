import { type NextRequest } from "next/server";

export type Stars = {
  s_ra: number;
  s_dec: number;
  s_dist: number;
  s_st: string;
  s_rad: number;
  s_lum: number;
  s_age: number;
  s_teff: number;
  s_logg: number;
}

export async function GET(request: NextRequest) {
  const baseUrl = `https://gea.esac.esa.int/tap-server/tap/sync?`;

  const searchParams = request.nextUrl.searchParams;
  const exoplanet_ra = searchParams.get('exoplanet_ra');
  const exoplanet_dec = searchParams.get('exoplanet_dec');
  const exoplanet_dist = searchParams.get('exoplanet_dist');

  // Getting cone search angle
  const searchBoundary = 30; // parsecs

  let query = ``;
  if (exoplanet_dist && parseFloat(exoplanet_dist) > 0.5) {
    const upperBoundary = parseFloat(exoplanet_dist) + searchBoundary;
    let lowerBoundary = parseFloat(exoplanet_dist) - searchBoundary;
    lowerBoundary < 0 && (lowerBoundary = 0);

    const searchAngle = Math.atan(searchBoundary/parseFloat(exoplanet_dist)) * 180/Math.PI
    query = `
    SELECT gs.ra, gs.dec, ap.distance_gspphot, ap.spectraltype_esphs, ap.radius_flame, ap.lum_flame, ap.age_flame, ap.teff_gspphot, ap.logg_gspphot
    FROM gaiadr3.gaia_source AS gs
    JOIN gaiadr3.astrophysical_parameters as ap
    ON gs.source_id = ap.source_id
    WHERE 1=CONTAINS(
      POINT('ICRS', gs.ra, gs.dec),
      CIRCLE('ICRS', ${exoplanet_ra}, ${exoplanet_dec}, ${searchAngle})
    )
    AND ap.distance_gspphot <= ${upperBoundary}
    AND ap.distance_gspphot >= ${lowerBoundary}
    `
  } else {
    query = `
    SELECT gs.ra, gs.dec, ap.distance_gspphot, ap.spectraltype_esphs, ap.radius_flame, ap.lum_flame, ap.age_flame, ap.teff_gspphot, ap.logg_gspphot
    FROM gaiadr3.gaia_source AS gs
    JOIN gaiadr3.astrophysical_parameters AS ap
    ON gs.source_id = ap.source_id
    WHERE ap.distance_gspphot <= ${searchBoundary}
    `
  };

  const url =
    baseUrl +
    new URLSearchParams({
      REQUEST: "doQuery",
      LANG: "ADQL",
      FORMAT: "json",
      // PHASE: "RUN",
      QUERY: `${query}`,
    });

  const res = await fetch(url);
  const data = await res.json();
  return Response.json({ data });
}
