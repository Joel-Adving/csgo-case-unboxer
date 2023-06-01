import { Skin } from '@/types'

export const filterSkinForSlider = (skin: Skin, _wonSkin: Skin) => {
  if (
    skin.name !== _wonSkin.name &&
    skin.type !== 'Gloves' &&
    skin.weapon_type !== 'Knife' &&
    skin.rarity !== 'Classified'
  ) {
    return true
  }
}
