import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = `https://gea.esac.esa.int/tap-server/tap/sync?`;

  const searchParams = request.nextUrl.searchParams
  const num = searchParams.get('num')

  const potentialQuery = `
  SELECT ra, dec, parallax
    FROM gaiadr3.gaia_source
    WHERE 1=CONTAINS(
      POINT('ICRS', gaiadr3.gaia_source.ra, gaiadr3.gaia_source.dec),
      CIRCLE('ICRS', 299.2685, 43.8542, 0.5)
    )
	AND parallax > 0
	AND ABS(1000/parallax) < 2000
	AND ABS(1000/parallax) > 1000
  `

  const url =
    baseUrl +
    new URLSearchParams({
      REQUEST: "doQuery",
      LANG: "ADQL",
      FORMAT: "json",
      // PHASE: "RUN",
      QUERY: `SELECT TOP ${num} source_id,ra,dec FROM gaiadr1.gaia_source`,
    });

  const res = await fetch(url);
  const data = await res.json();

  return Response.json({ data });
}
