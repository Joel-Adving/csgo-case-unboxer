import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from './slices/inventorySlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { api } from './services/api'
import { csgoApi } from './services/csgoApi'

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    [api.reducerPath]: api.reducer,
    [csgoApi.reducerPath]: csgoApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, csgoApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
