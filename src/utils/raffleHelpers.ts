import { Skin } from '@/types'
import { FUN_RARITY_PERCENTAGES, RARITY, REAL_RARITY_PERCENTAGES } from '@/utils/constants'

export type Rarity = typeof REAL_RARITY_PERCENTAGES | typeof FUN_RARITY_PERCENTAGES

export const raffleFilter = (skin: Skin, wonSkin: Skin) => {
  if (
    skin?.name !== wonSkin?.name &&
    skin?.type !== 'Gloves' &&
    skin?.weapon_type !== 'Knife' &&
    skin?.rarity !== 'Classified'
  ) {
    return true
  }
}

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

export const getRandomSkin = (percentages: Rarity, skins: Skin[]): Skin => {
  const rarity = rarityDiceRoll(percentages)
  const filteredSkins = skins.filter((skin) => {
    if (rarity.some((type) => type === skin.type || type === skin.weapon_type)) {
      return true
    } else if (
      rarity.some((type) => {
        return type === skin.rarity && skin.type !== 'Gloves' && skin.weapon_type !== 'Knife'
      })
    ) {
      return true
    }
  })

  return filteredSkins[Math.floor(Math.random() * filteredSkins.length)] ?? getRandomSkin(percentages, skins)
}

export function getRaffleSkins(wonSkin: Skin, skins: Skin[]) {
  const raffleSkins = Array.from({ length: 74 }, () => getRandomSkin(REAL_RARITY_PERCENTAGES, skins)).filter((skin) =>
    raffleFilter(skin, wonSkin)
  )
  while (raffleSkins.length < 74) {
    const raffleSkin = getRandomSkin(REAL_RARITY_PERCENTAGES, skins)
    if (raffleFilter(raffleSkin, wonSkin)) {
      raffleSkins.push(raffleSkin)
    }
  }
  return raffleSkins
}
