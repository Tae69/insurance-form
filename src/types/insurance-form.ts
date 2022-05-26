import type { Currency } from "@/enums/currency";

export type InsuranceFormData = {
  name: string;
  age: number;
  country: string;
  selectedPackage: string;
  currency: Currency;
  premium: number;
};
