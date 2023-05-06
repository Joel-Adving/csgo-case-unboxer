import { gradeLevels } from '@/constants'
import { SkinType } from '@/types'

export const sortSkinByRarity = (skins: SkinType[]) => {
  return skins.sort((a, b) => {
    const aGrade = gradeLevels[a.rarity]
    const bGrade = gradeLevels[b.rarity]
    return aGrade - bGrade
  })
}
