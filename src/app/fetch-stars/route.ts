import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = `https://gea.esac.esa.int/tap-server/tap/sync?`;

  const searchParams = request.nextUrl.searchParams
  const num = searchParams.get('num')

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
