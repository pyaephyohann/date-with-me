import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./slices/appSlice";
import { placesSlice } from "./slices/placesSlice";
import { foodsSlice } from "./slices/foodsSlice";
import { drinksSlice } from "./slices/drinksSlice";
import { dateTypesSlice } from "./slices/dateTypesSlice";
import { datePlanBucketSlice } from "./slices/datePlanBucketSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appSlice.reducer,
      places: placesSlice.reducer,
      foods: foodsSlice.reducer,
      drinks: drinksSlice.reducer,
      dateTypes: dateTypesSlice.reducer,
      datePlanBucket: datePlanBucketSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
