import { SkinItem } from '@/types'

export const filterSkinForSlider = (skin: SkinItem, _wonSkin: SkinItem) => {
  if (
    skin.name !== _wonSkin.name &&
    skin.type !== 'Gloves' &&
    skin.weapon_type !== 'Knife' &&
    skin.rarity !== 'Classified'
  ) {
    return true
  }
}
