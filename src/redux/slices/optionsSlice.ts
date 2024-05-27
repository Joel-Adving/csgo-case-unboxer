import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useCallback } from 'react'

export type OptionsType = {
  fastMode: boolean
  autoOpen: boolean
  highChance: boolean
  showKnifesAndGloves: boolean
  audio: boolean
}

const initialState: OptionsType = {
  fastMode: false,
  autoOpen: false,
  highChance: false,
  showKnifesAndGloves: false,
  audio: true
}

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setFastMode: (state, action) => {
      state.fastMode = action.payload
    },
    setAutoOpen: (state, action) => {
      state.autoOpen = action.payload
    },
    setHighChance: (state, action) => {
      state.highChance = action.payload
    },
    setShowKnifesAndGloves: (state, action) => {
      state.showKnifesAndGloves = action.payload
    },
    setAudio: (state, action) => {
      state.audio = action.payload
    }
  }
})

export default optionsSlice.reducer

const { actions } = optionsSlice

export const useOptions = () => {
  const dispatch = useDispatch()
  const options = useSelector((state: RootState) => state.options)

  const setAudio = useCallback((audio: boolean) => dispatch(actions.setAudio(audio)), [dispatch])
  const setFastMode = useCallback((fastMode: boolean) => dispatch(actions.setFastMode(fastMode)), [dispatch])
  const setAutoOpen = useCallback((autoOpen: boolean) => dispatch(actions.setAutoOpen(autoOpen)), [dispatch])
  const setHighChance = useCallback((highChance: boolean) => dispatch(actions.setHighChance(highChance)), [dispatch])
  const setShowKnifesAndGloves = useCallback(
    (showKnifesAndGloves: boolean) => dispatch(actions.setShowKnifesAndGloves(showKnifesAndGloves)),
    [dispatch]
  )

  return {
    options,
    setAudio,
    setFastMode,
    setAutoOpen,
    setHighChance,
    setShowKnifesAndGloves
  }
}
