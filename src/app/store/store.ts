import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "./currenciesReducer";

export default configureStore({
  reducer: {
    currencies: currenciesReducer,
  },
});
