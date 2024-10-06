import { Exoplanet } from "../fetch-exoplanets/route";

// TODO Need the star's radius to estimate the habitable zone

export default function habitablePeriods(planet: Exoplanet) {
    const T = planet.st_teff // Effective temp
    // const r = planet.st // Star radius

    const F = 5.67e-8 * (T**4)// Flux
    // const L // Luminosity

    return

}