import { SkinType } from '@/types'
import { GRADE_LEVELS } from '@/constants'

export const sortSkinByRarity = (skins: SkinType[]) => {
  return skins.sort((a, b) => GRADE_LEVELS[a.rarity] - GRADE_LEVELS[b.rarity])
}
