import { Foods } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FoodsState {
  isLoading: boolean;
  items: Foods[];
}

const initialState: FoodsState = {
  isLoading: false,
  items: [],
};

export const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    setFoods: (state, action: PayloadAction<Foods[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setFoods } = foodsSlice.actions;

export default foodsSlice.reducer;
