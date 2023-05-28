import { Skin } from '@/types'
import { GRADE_LEVELS } from '@/utils/constants'

export const sortSkinByRarity = (skins: Skin[]) => {
  return skins.sort((a, b) => GRADE_LEVELS[a.rarity] - GRADE_LEVELS[b.rarity])
}
