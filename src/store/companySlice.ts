import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CompanyInfo = {
  NombreComercial: string;
  NombreLegal: string;
  CEO: string;
  FechaCreacion: string;
  IngresoAnual: number;
  CantidadEmpleados: number;
  Pais: string;
  PrincipalProducto: string;
};

type CompanyState = {
  data: CompanyInfo[];
};

const initialState: CompanyState = {
  data: [],
};

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompanies(state, action: PayloadAction<CompanyInfo[]>) {
      state.data = action.payload;
    },
  },
});

export const { setCompanies } = companySlice.actions;

export default companySlice.reducer;
