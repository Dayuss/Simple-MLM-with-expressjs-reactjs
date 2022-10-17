import { configureStore } from '@reduxjs/toolkit'
import { memberApi } from './api/memberApi'

export const store = configureStore({
  reducer: {
    [memberApi.reducerPath]: memberApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat([memberApi.middleware]),
})
