import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customerReducer from './customer/customerSlice';
import managerReducer from './manager/managerSlice';
import uiReducer from './common/uiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const UIPersisterConfig = {
  key: 'uiPersistedData',
  whitelist: ['userRole', 'pinnedChats', 'maxPins', 'isTokenSent'],
  storage: AsyncStorage,
};
const customerPersisterConfig = {
  key: 'customerPersistedData',
  whitelist: ['authenticated', 'customer'],
  storage: AsyncStorage,
};
const managerPersisterConfig = {
  key: 'managerPersistedData',
  whitelist: ['authenticated', 'manager'],
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  customer: persistReducer(customerPersisterConfig, customerReducer),
  manager: persistReducer(managerPersisterConfig, managerReducer),
  ui: persistReducer(UIPersisterConfig, uiReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.EXPO_PUBLIC_NODE_ENV !== 'production',
});

export const persister = persistStore(store);

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;
