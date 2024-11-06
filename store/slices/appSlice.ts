import { config } from "@/config";
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { setPlaces } from "./placesSlice";
import { RootState } from "..";
import { setFoods } from "./foodsSlice";
import { setDrinks } from "./drinksSlice";
import { setDateTypes } from "./dateTypesSlice";

interface AppState {
  init: boolean;
  isLoading: boolean;
}

const initialState: AppState = {
  init: false,
  isLoading: false,
};

export const fetchAppDatas = createAsyncThunk(
  "app/fetchAppDatas",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/api/get-all-datas`);
    const responseJson = await response.json();
    const { datas } = responseJson;
    const { places, foods, drinks, dateTypes } = datas;
    thunkAPI.dispatch(setPlaces(places));
    thunkAPI.dispatch(setFoods(foods));
    thunkAPI.dispatch(setDrinks(drinks));
    thunkAPI.dispatch(setDateTypes(dateTypes));
  }
);

export const selectApp = (state: RootState) => state.app;
export const selectPlaces = (state: RootState) => state.places.items;
export const selectFoods = (state: RootState) => state.foods.items;
export const selectDrinks = (state: RootState) => state.drinks.items;
export const selectDateTypes = (state: RootState) => state.dateTypes.items;
export const selectDatePlanBucket = (state: RootState) =>
  state.datePlanBucket.datePlan;

export const appDatas = createSelector(
  [
    selectApp,
    selectPlaces,
    selectFoods,
    selectDrinks,
    selectDateTypes,
    selectDatePlanBucket,
  ],
  (app, places, foods, drinks, dateTypes, datePlanBucket) => {
    return {
      isLoading: app.isLoading,
      places,
      foods,
      drinks,
      dateTypes,
      datePlanBucket,
    };
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setInit, setIsLoading } = appSlice.actions;

export default appSlice.reducer;
