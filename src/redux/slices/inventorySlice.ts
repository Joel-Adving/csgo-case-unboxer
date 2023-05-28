import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Skin } from '@/types'

export type InventoryType = {
  items: Skin[]
  show: boolean
}

const initialState: InventoryType = {
  items: [],
  show: true
}

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
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

export const { addInventoryItem, removeInventoryItem, clearInventory, setShowInventory, toggleInventory } =
  inventorySlice.actions
export default inventorySlice.reducer

export const useInventory = () => {
  const dispatch = useDispatch()
  const inventory = useSelector((state: RootState) => state.inventory)

  return {
    inventory,
    addInventoryItem: (item: any) => dispatch(addInventoryItem(item)),
    removeInventoryItem: (id: string) => dispatch(removeInventoryItem(id)),
    clearInventory: () => dispatch(clearInventory()),
    setShowInventory: (show: boolean) => dispatch(setShowInventory(show)),
    toggleInventory: () => dispatch(toggleInventory())
  }
}
