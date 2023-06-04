import { useCallback } from 'react'

export function useAudio(url: string, { volume }: { volume: number } = { volume: 0.15 }): () => void {
  const playAudio = useCallback(async () => {
    const audio = new Audio(url)
    audio.volume = volume
    await audio.play()
    audio.remove()
  }, [url, volume])

  return playAudio
}
