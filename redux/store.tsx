import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userProfile from './reducers/userProfile';
import services from './reducers/services';
import settings from './reducers/settings';
import dashboard from './reducers/dashboard';
import upcomingAppointments from './reducers/upcomingAppointsments';
import appointments from './reducers/appointments';
import locations from './reducers/locations';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import customers from './reducers/customers';

const rootReducer = combineReducers({
  user: userProfile,
  services: services,
  settings: settings,
  dashboard: dashboard,
  upcomingAppointments: upcomingAppointments,
  appointments: appointments,
  locations: locations,
  customers: customers,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: [''],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
