import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export interface IState {
  steps: number;
  currentSteps: number;
}

const initialState: IState = {
  steps: 0,
  currentSteps: 0
};

export const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    increaseCurrentSteps: (state) => {
      state.currentSteps = state.currentSteps + 1;
    },
    decreaseCurrentSteps: (state) => {
      if (state.currentSteps > 0) {
        state.currentSteps = state.currentSteps - 1;
      }
    },
    setSteps: (state, { payload }: PayloadAction<number>) => {
      state.steps = payload;
    }
  }
});

export const { increaseCurrentSteps, decreaseCurrentSteps, setSteps } =
  stepsSlice.actions;

export const selectSteps = createSelector(
  ({ steps }: RootState) => steps,
  ({ steps }: IState) => steps
);

export const selectCurrentSteps = createSelector(
  ({ steps }: RootState) => steps,
  ({ currentSteps }: IState) => currentSteps
);

export default stepsSlice.reducer;
