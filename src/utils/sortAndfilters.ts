import { Skin } from '@/types'
import { RARITY_INDEX } from './constants'

export function raritySorter(skins: Skin[]) {
  return skins.slice().sort((a, b) => {
    return RARITY_INDEX[a.rarity as keyof typeof RARITY_INDEX] - RARITY_INDEX[b.rarity as keyof typeof RARITY_INDEX]
  })
}

export function filterDisplayedSkins(showKnifesAndGloves: boolean, skins: Skin[]) {
  return showKnifesAndGloves
    ? skins
    : skins?.filter((s) => {
        if (s?.weapon_type === 'Knife' || s?.type === 'Gloves') {
          return false
        }
        return true
      })
}
