export type CountryName =
  | "United States of America"
  | "Spain"
  | "Canada"
  | "Netherlands"
  | "Germany";

export const countryMapping: Record<CountryName, string> = {
  "United States of America": "US",
  Spain: "ES",
  Canada: "CA",
  Netherlands: "NL",
  Germany: "DE",
};

export type CompanyInfo = {
  NombreComercial: string;
  NombreLegal: string;
  CEO: string;
  FechaCreacion: string;
  IngresoAnual: number;
  CantidadEmpleados: number;
  Pais: CountryName;
  PrincipalProducto: string;
};