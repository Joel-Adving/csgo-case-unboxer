import { SkinType } from '@/types'
import { gradeLevels } from '@/constants'

export const sortSkinByRarity = (skins: SkinType[]) => {
  return skins.sort((a, b) => gradeLevels[a.rarity] - gradeLevels[b.rarity])
}
