import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DatePlan {
  dayToDate: String | null;
  timeToDate: String | null;
  placeIds: Number[];
  foodIds: Number[];
  drinkIds: Number[];
  dateTypeIds: Number[];
}

interface DatePlanState {
  isLoading: boolean;
  datePlan: DatePlan;
}

const initialState: DatePlanState = {
  isLoading: false,
  datePlan: {
    dayToDate: null,
    timeToDate: null,
    placeIds: [],
    foodIds: [],
    drinkIds: [],
    dateTypeIds: [],
  },
};

export const datePlanBucketSlice = createSlice({
  name: "datePlanBucket",
  initialState,
  reducers: {
    setDatePlan: (state, action: PayloadAction<DatePlan>) => {
      state.datePlan = action.payload;
    },
  },
});

export const { setDatePlan } = datePlanBucketSlice.actions;

export default datePlanBucketSlice.reducer;
