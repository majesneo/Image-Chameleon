import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import rootReducer from './rootReducer';
import { uploadApi } from '@/app/store/upload/api';

const devMode = process.env.NODE_ENV === 'development';

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }).concat([uploadApi.middleware]),
    devTools: devMode
  });
  const persistor = persistStore(store);

  return {
    store,
    persistor
  };
};
export type AppStore = ReturnType<typeof makeStore>['store'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(() => makeStore().store);
export const { store: appStore, persistor } = makeStore();
