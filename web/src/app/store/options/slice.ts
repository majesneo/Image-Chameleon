import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export enum options {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop'
}

export interface IState {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

const initialState: IState = {
  mobile: true,
  tablet: true,
  desktop: true
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setOptions: (
      state,
      {
        payload: { key, value }
      }: PayloadAction<{
        key: options;
        value: boolean;
      }>
    ) => {
      state[key] = value;
    }
  }
});

export const { setOptions } = optionsSlice.actions;

export const selectOptions = createSelector(
  ({ options }: RootState) => options,
  (options: IState) => options
);

export default optionsSlice.reducer;
