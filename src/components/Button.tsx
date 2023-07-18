'use client'

import { useAudio } from '@/hooks/useAudio'
import React, { useEffect, useRef } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, className, ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  const playPress = useAudio('/sound/generic_press_01.wav')
  const playHover = useAudio('/sound/itemtile_plastic_rollover_15.wav', { volume: 0.15 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener('mousedown', playPress)
    element.addEventListener('mouseenter', playHover)

    return () => {
      element.removeEventListener('mousedown', playPress)
      element.removeEventListener('mouseenter', playHover)
    }
  }, [playHover, playPress])

  return (
    <button
      ref={ref}
      className={`${className} px-4 py-1 text-gray-300 border border-gray-400 rounded w-fit hover:border-gray-100 hover:text-gray-100`}
      {...props}
    >
      {children}
    </button>
  )
}
