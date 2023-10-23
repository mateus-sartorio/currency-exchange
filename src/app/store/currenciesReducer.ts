import { createSlice } from "@reduxjs/toolkit";

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    currenciesArray: ["USD"] as string[],
  },
  reducers: {
    addCurrency: (state, action) => {
      state.currenciesArray = [...state.currenciesArray, action.payload];
    },
    removeCurrency: (state, action) => {
      state.currenciesArray = state.currenciesArray.filter((currency) => currency !== action.payload);
    },
  },
});

export const { addCurrency, removeCurrency } = currenciesSlice.actions;

export const selectCurrencies = (state: any) => state.currencies.currenciesArray;

export default currenciesSlice.reducer;
