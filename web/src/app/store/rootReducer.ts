import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { optionsSlice } from '@/app/store/options/slice';
import { uploadApi } from '@/app/store/upload/api';

const combinedReducer = combineReducers({
  [optionsSlice.name]: optionsSlice.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer
});

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
) => {
  return combinedReducer(state, action);
};

export default rootReducer;
