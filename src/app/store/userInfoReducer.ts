import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Currency } from "../types/Currency";
import { RootState } from "./store";
import { UserInfo } from "../types/UserInfo";

export const currenciesSlice = createSlice({
  name: "userInfo",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    referenceCurrency: "",
    favoriteCurrencies: [] as string[],
  } as UserInfo,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setReferenceCurrency: (state, action: PayloadAction<string>) => {
      state.referenceCurrency = action.payload;
    },
    setFavoriteCurrencies: (state, action: PayloadAction<string[]>) => {
      state.favoriteCurrencies = action.payload;
    },
    addFavoriteCurrency: (state, action: PayloadAction<string>) => {
      state.favoriteCurrencies = [...state.favoriteCurrencies, action.payload];
    },
    removeFavoriteCurrency: (state, action: PayloadAction<string>) => {
      state.favoriteCurrencies = state.favoriteCurrencies.filter((currency) => currency !== action.payload);
    },
  },
});

export const { setFirstName, setLastName, setEmail, setUsername, setReferenceCurrency, setFavoriteCurrencies, addFavoriteCurrency, removeFavoriteCurrency } = currenciesSlice.actions;

export const selectFirstName = (state: RootState) => state.userInfo.firstName;
export const selectLastName = (state: RootState) => state.userInfo.lastName;
export const selectEmail = (state: RootState) => state.userInfo.email;
export const selectUsername = (state: RootState) => state.userInfo.username;
export const selectReferenceCurrency = (state: RootState) => state.userInfo.referenceCurrency;
export const selectFavoriteCurrencies = (state: RootState) => state.userInfo.favoriteCurrencies;

export default currenciesSlice.reducer;
