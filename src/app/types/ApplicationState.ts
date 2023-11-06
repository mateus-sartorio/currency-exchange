import { Currency } from "./Currency";

export interface ApplicationState {
  allCrrenciesList: Currency[];
  userLogged: boolean;
}
