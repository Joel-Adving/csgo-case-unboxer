import { Skin } from '@/types'

export function getPrice(skin: Skin) {
  return (
    skin?.prices?.['Factory New']?.['7_days']?.median ??
    skin?.prices?.['Factory New']?.['30_days']?.median ??
    skin?.prices?.['Factory New']?.all_time?.median ??
    skin?.prices?.['Minimal Wear']?.['7_days']?.median ??
    skin.prices?.['Field-Tested']?.['7_days']?.median ??
    skin.prices?.['Well-Worn']?.['7_days']?.median ??
    skin.prices?.['Battle-Scarred']?.['7_days']?.median ??
    0
  )
}
