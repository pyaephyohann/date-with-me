import { DateTypes } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DateTypesState {
  isLoading: boolean;
  items: DateTypes[];
}

const initialState: DateTypesState = {
  isLoading: false,
  items: [],
};

export const dateTypesSlice = createSlice({
  name: "dateTypes",
  initialState,
  reducers: {
    setDateTypes: (state, action: PayloadAction<DateTypes[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setDateTypes } = dateTypesSlice.actions;

export default dateTypesSlice.reducer;
