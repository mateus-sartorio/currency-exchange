import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { StateType } from "../types/StateType";
import { Currency } from "../types/Currency";
import { RootState } from "./store";

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    currenciesArray: ["EUR"] as string[],
    referenceCurrency: "USD",
    allCurrenciesList: [] as Currency[],
  } as StateType,
  reducers: {
    addCurrency: (state, action: PayloadAction<string>) => {
      state.currenciesArray = [...state.currenciesArray, action.payload];
    },
    removeCurrency: (state, action: PayloadAction<string>) => {
      state.currenciesArray = state.currenciesArray.filter((currency) => currency !== action.payload);
    },
    setReferenceCurrency: (state, action: PayloadAction<string>) => {
      state.referenceCurrency = action.payload;
    },
    setAllCurrenciesList: (state, action: PayloadAction<Currency[]>) => {
      state.allCurrenciesList = action.payload;
    },
  },
});

export const { addCurrency, removeCurrency, setReferenceCurrency, setAllCurrenciesList } = currenciesSlice.actions;

export const selectCurrencies = (state: RootState) => state.currencies.currenciesArray;
export const selectReferenceCurrency = (state: RootState) => state.currencies.referenceCurrency;
export const selectAllCurrenciesList = (state: RootState) => state.currencies.allCurrenciesList;

export default currenciesSlice.reducer;
