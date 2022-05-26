import { describe, it, expect } from "vitest";

import { Country } from "../../enums/country";
import { getBasePremium, getFinalPremium } from "../premiumCalculator";
import { Package } from "@/enums/package";

describe("PremiumCalculator", () => {
  it("must have base price = 10 * age * 1 for Hong Kong", () => {
    const age = 10;
    const country = Country.HongKong;
    expect(getBasePremium(age, country)).toEqual(100);
  });

  it("must have base price = 10 * age * 2 for USA", () => {
    const age = 10;
    const country = Country.USA;
    expect(getBasePremium(age, country)).toEqual(200);
  });

  it("must have base price = 10 * age * 3 for Australia", () => {
    const age = 10;
    const country = Country.Australia;
    expect(getBasePremium(age, country)).toEqual(300);
  });

  it("must have final price = (10 * age * 1) * 1 for Standard package", () => {
    const age = 10;
    const country = Country.HongKong;
    expect(getFinalPremium(age, country, Package.Standard)).toEqual(100);
  });

  it("must have final price = (10 * age * 1) * 1.5 for Safe package", () => {
    const age = 10;
    const country = Country.HongKong;
    expect(getFinalPremium(age, country, Package.Safe)).toEqual(150);
  });

  it("must have final price = (10 * age * 1) * 1.75 for Super Safe package", () => {
    const age = 10;
    const country = Country.HongKong;
    expect(getFinalPremium(age, country, Package.SuperSafe)).toEqual(175);
  });
});
