import { useEffect, useState } from 'react'
import useEventListener from './useEventListener'

type WindowSize = {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0
  })

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEventListener('resize', handleSize)

  useEffect(() => {
    handleSize()
  }, [])

  return windowSize
}
