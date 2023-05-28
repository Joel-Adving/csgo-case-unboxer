import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from './slices/inventorySlice'
import { csgoApi } from './services/csgoApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    [csgoApi.reducerPath]: csgoApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(csgoApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
