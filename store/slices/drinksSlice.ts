import { Drinks } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DrinksState {
  isLoading: boolean;
  items: Drinks[];
}

const initialState: DrinksState = {
  isLoading: false,
  items: [],
};

export const drinksSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    setDrinks: (state, action: PayloadAction<Drinks[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setDrinks } = drinksSlice.actions;

export default drinksSlice.reducer;
