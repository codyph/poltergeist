export const getStars = async (id: number): Promise<string[]> => {
  //   const query = `SELECT *, DISTANCE(81.28, -69.78, ra, dec) AS ang_sep
  // // FROM gaiadr3.gaia_source
  // // WHERE DISTANCE(81.28, -69.78, ra, dec) < 5./60.
  // // AND phot_g_mean_mag < 20.5
  // // AND parallax IS NOT NULL
  // // ORDER BY ang_sep ASC`;

  // const encodedQuery = encodeURIComponent(query);
  const url = `https://gea.esac.esa.int/tap-server/tap/sync?REQUEST=doQuery&LANG=ADQL&FORMAT=votable&QUERY=SELECT+TOP+5+source_id,ra,dec+FROM+gaiadr1.gaia_source`; //`https://gea.esac.esa.int/tap-server/tap/sync?REQUEST=doQuery&LANG=ADQL&FORMAT=json&QUERY=${encodedQuery}`;

  const response = await fetch(url, {
    method: "POST",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Credentials": "true",
    //   "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    //   "Access-Control-Allow-Headers":
    //     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    // },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();

  return result;
};
