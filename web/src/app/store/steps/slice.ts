import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export interface IState {
  steps: number;
  currentSteps: number;
  isLoadingSteps: boolean;
}

const initialState: IState = {
  steps: 0,
  currentSteps: 0,
  isLoadingSteps: false
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
    },
    setIsLoadingSteps(state, action: PayloadAction<boolean>) {
      state.isLoadingSteps = action.payload;
    },
    resetSteps: () => initialState
  }
});

export const {
  increaseCurrentSteps,
  decreaseCurrentSteps,
  setSteps,
  setIsLoadingSteps,
  resetSteps
} = stepsSlice.actions;

export const selectSteps = createSelector(
  ({ steps }: RootState) => steps,
  ({ steps }: IState) => steps
);

export const selectCurrentSteps = createSelector(
  ({ steps }: RootState) => steps,
  ({ currentSteps }: IState) => currentSteps
);

export const selectIsLoadingSteps = createSelector(
  ({ steps }: RootState) => steps,
  ({ isLoadingSteps }: IState) => isLoadingSteps
);

export default stepsSlice.reducer;
