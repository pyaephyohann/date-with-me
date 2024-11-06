import { Places } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlacesState {
  isLoading: boolean;
  items: Places[];
}

const initialState: PlacesState = {
  isLoading: false,
  items: [],
};

export const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces: (state, action: PayloadAction<Places[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setPlaces } = placesSlice.actions;

export default placesSlice.reducer;
