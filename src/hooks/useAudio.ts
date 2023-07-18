import { useOptions } from '@/redux/slices/optionsSlice'
import { useCallback } from 'react'

export function useAudio(url: string, { volume }: { volume: number } = { volume: 0.15 }): () => void {
  const { options } = useOptions()

  const playAudio = useCallback(async () => {
    if (!options.audio) return
    const audio = new Audio(url)
    audio.volume = volume
    await audio.play()
    audio.remove()
  }, [url, volume, options.audio])

  return playAudio
}
