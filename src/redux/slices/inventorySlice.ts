import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Skin } from '@/types'
import { useCallback } from 'react'

export type InventoryType = {
  items: Skin[]
  show: boolean
}

const initialState: InventoryType = {
  items: [],
  show: false
}

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventory: (state, action) => {
      state.items = action.payload
    },
    addInventoryItem: (state, action) => {
      state.items.push(action.payload)
    },
    removeInventoryItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearInventory: (state) => {
      state.items = []
    },
    toggleInventory: (state) => {
      state.show = !state.show
    },
    setShowInventory: (state, action) => {
      state.show = action.payload
    }
  }
})

export default inventorySlice.reducer

const { actions } = inventorySlice

export const useInventory = () => {
  const dispatch = useDispatch()
  const { inventory } = useSelector((state: RootState) => state)

  const clearInventory = useCallback(() => dispatch(actions.clearInventory()), [dispatch])
  const toggleInventory = useCallback(() => dispatch(actions.toggleInventory()), [dispatch])
  const setInventory = useCallback((items: Skin[]) => dispatch(actions.setInventory(items)), [dispatch])
  const addInventoryItem = useCallback((item: Skin) => dispatch(actions.addInventoryItem(item)), [dispatch])
  const setShowInventory = useCallback((show: boolean) => dispatch(actions.setShowInventory(show)), [dispatch])
  const removeInventoryItem = useCallback((id: string) => dispatch(actions.removeInventoryItem(id)), [dispatch])

  return {
    inventory,
    setInventory,
    addInventoryItem,
    removeInventoryItem,
    clearInventory,
    setShowInventory,
    toggleInventory
  }
}
