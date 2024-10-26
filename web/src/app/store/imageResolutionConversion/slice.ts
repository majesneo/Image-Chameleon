import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export interface IState {
  imagesResolution: [];
}

const initialState: IState = {
  imagesResolution: []
};

export const imageResolutionSlice = createSlice({
  name: 'imageResolution',
  initialState,
  reducers: {
    setImagesResolution: (state, { payload }) => {
      state.imagesResolution = payload;
    },
    resetImageResolution: () => initialState
  }
});

export const { setImagesResolution, resetImageResolution } =
  imageResolutionSlice.actions;

export const selectImagesResolution = createSelector(
  ({ imageResolution }: RootState) => imageResolution,
  ({ imagesResolution }: IState) => imagesResolution
);

export default imageResolutionSlice.reducer;
