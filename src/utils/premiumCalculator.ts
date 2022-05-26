import { Package } from "../enums/package";
import { Country } from "../enums/country";

export function getBasePremium(age: number, country: Country): number {
  let premium = 10 * Number(age);

  switch (country) {
    case Country.USA:
      premium = premium * 2;
      break;
    case Country.Australia:
      premium = premium * 3;
      break;
    default:
      break;
  }

  return premium;
}

export function getAdditionalCostByPackage(
  premium: number,
  selectedPackage: Package
): number {
  switch (selectedPackage) {
    case Package.Safe:
      return premium * 0.5;
    case Package.SuperSafe:
      return premium * 0.75;
    default:
      return 0;
  }
}

export function getFinalPremium(
  age: number,
  country: Country,
  selectedPackage: Package
): number {
  const base = getBasePremium(age, country);
  const additional = getAdditionalCostByPackage(base, selectedPackage);

  return base + additional;
}
