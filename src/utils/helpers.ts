import { SkinItem } from '@/types'
import { FUN_RARITY_PERCENTAGES, RARITY, REAL_RARITY_PERCENTAGES } from '@/utils/constants'

export type Rarity = typeof REAL_RARITY_PERCENTAGES | typeof FUN_RARITY_PERCENTAGES

export function rarityDiceRoll(percentages: Rarity) {
  const { rare, mythical, legendary, exceedinglyRare, ancient } = percentages
  const randomNumber = Math.random()
  switch (true) {
    case randomNumber < rare:
      return RARITY.rare
    case randomNumber < rare + mythical:
      return RARITY.mythical
    case randomNumber < rare + mythical + legendary:
      return RARITY.legendary
    case randomNumber < rare + mythical + legendary + ancient:
      return RARITY.ancient
    case randomNumber < rare + mythical + legendary + ancient + exceedinglyRare:
      return RARITY.exceedinglyRare
    default:
      return RARITY.rare
  }
}

export const filterSkin = (skin: SkinItem, _wonSkin: SkinItem) => {
  if (
    skin.name !== _wonSkin.name &&
    skin.type !== 'Gloves' &&
    skin.weapon_type !== 'Knife' &&
    skin.rarity !== 'Classified'
  ) {
    return true
  }
}
