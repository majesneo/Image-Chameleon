import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { optionsSlice } from '@/app/store/options/slice';
import { uploadApi } from '@/app/store/upload/api';
import { imageResolutionConversionApi } from '@/app/store/imageResolutionConversion/api';
import { imageResolutionSlice } from '@/app/store/imageResolutionConversion/slice';
import { stepsSlice } from '@/app/store/steps/slice';

const combinedReducer = combineReducers({
  [optionsSlice.name]: optionsSlice.reducer,
  [imageResolutionSlice.name]: imageResolutionSlice.reducer,
  [stepsSlice.name]: stepsSlice.reducer,
  uploadApi: uploadApi.reducer,
  imageResolutionConversionApi: imageResolutionConversionApi.reducer
});

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
) => {
  return combinedReducer(state, action);
};

export default rootReducer;
