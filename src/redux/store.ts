import { configureStore } from '@reduxjs/toolkit'
import optionsReducer from './slices/optionsSlice'
import inventoryReducer from './slices/inventorySlice'
import { api } from './services/api'
import { csgoApi } from './services/bymykelApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    options: optionsReducer,
    inventory: inventoryReducer,
    [api.reducerPath]: api.reducer,
    [csgoApi.reducerPath]: csgoApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, csgoApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
