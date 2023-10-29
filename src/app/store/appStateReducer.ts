import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ApplicationState } from "../types/ApplicationState";
import { Currency } from "../types/Currency";
import { RootState } from "./store";

export const appStateSlice = createSlice({
  name: "appState",
  initialState: {
    allCrrenciesList: [],
    userLogged: false,
  } as ApplicationState,
  reducers: {
    // addCurrency: (state, action: PayloadAction<string>) => {
    //   state.appStateArray = [...state.appStateArray, action.payload];
    // },
    // removeCurrency: (state, action: PayloadAction<string>) => {
    //   state.appStateArray = state.appStateArray.filter((currency) => currency !== action.payload);
    // },
    // setReferenceCurrency: (state, action: PayloadAction<string>) => {
    //   state.referenceCurrency = action.payload;
    // },
    setAllCurrenciesList: (state, action: PayloadAction<Currency[]>) => {
      state.allCrrenciesList = action.payload;
    },
    setUserLogged: (state) => {
      state.userLogged = true;
    },
    setUserNotLogged: (state) => {
      state.userLogged = false;
    },
  },
});

export const { setAllCurrenciesList, setUserLogged, setUserNotLogged } = appStateSlice.actions;

export const selectAllCurrenciesList = (state: RootState) => state.appState.allCrrenciesList;
export const selectIsUserLogged = (state: RootState) => state.appState.userLogged;

export default appStateSlice.reducer;
