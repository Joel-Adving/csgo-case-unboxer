import { prisma } from '@/libs/prisma'
import { Skin } from '@prisma/client'

export type SkinRequestData = {
  name: string
  marketable: number
  tradable: number
  classid: string
  icon_url: string
  icon_url_large: string
  type: string
  weapon_type: string
  gun_type: string
  souvenir: number
  exterior: string
  tournament: number
  rarity: string
  rarity_color: string
  price: string
  first_sale_date: string
  knife_type: string
}

export const CSGO_BACKPACK_API = 'https://csgobackpack.net/api/GetItemsList/v2/'
const BYMYKEL_API = 'https://bymykel.github.io/CSGO-API/api/en/skins.json'
const excluded = ['StatTrak™', 'Sticker', 'Patch', 'Sealed Graffiti']

export function combineGrades(csgobackpackData: any) {
  const combinedGrades = new Map()

  for (const [key, value] of Object.entries(csgobackpackData.items_list) as [string, SkinRequestData][]) {
    if (excluded.some((item) => key.includes(item))) continue
    const skinName = value?.name
      .split(' (')[0]
      .replace(/(?:Souvenir |★ )/g, '')
      .replace(/(?:%27|&#39)/g, "'")
    if (!skinName) continue
    const skinCondition = value?.name.split(' (')[1]?.split(')')[0]
    if (combinedGrades.has(skinName)) {
      combinedGrades.set(skinName, {
        ...combinedGrades.get(skinName),
        prices: {
          ...combinedGrades.get(skinName).prices,
          [skinCondition]: value.price
        }
      })
    } else {
      const { icon_url, icon_url_large, price, exterior, souvenir, tradable, marketable, tournament, name, ...rest } =
        value
      combinedGrades.set(skinName, {
        ...rest,
        name: skinName,
        prices: {
          [skinCondition]: value.price
        }
      })
    }
  }

  return Array.from(combinedGrades.values()).filter((skin) => {
    return skin.type === 'Weapon' || skin.type === 'Gloves'
  })
}

export async function getAndCombineSkinsData() {
  const [csgobackpackData, bymykelData] = await Promise.all([
    fetch(CSGO_BACKPACK_API).then((res) => res.json()),
    fetch(BYMYKEL_API).then((res) => res.json())
  ])

  console.log('')
  console.log('')
  console.log('')
  console.log('csgobackpackData', csgobackpackData)
  console.log('')
  console.log('')
  console.log('')
  console.log('bymykelData', bymykelData)
  console.log('')
  console.log('')
  console.log('')

  const combinedGrades = combineGrades(csgobackpackData)
  return combinedGrades
    .map((s) => {
      const bymykelSkin = bymykelData.find((skin: any) => skin.name.replace(/(?:%27|&#39)/g, "'").includes(s.name))
      if (!bymykelSkin) return null
      s.image = bymykelSkin?.image
      s.id = bymykelSkin?.id
      s.min_float = bymykelSkin?.min_float
      s.max_float = bymykelSkin?.max_float
      s.stattrak = bymykelSkin?.stattrak
      return s
    })
    .filter((s) => s !== null)
}

export async function getSkins() {
  const data = await getAndCombineSkinsData()
  const skins: Skin[] = []
  for (let i = 0; i < data.length; i++) {
    const skin = data[i]
    if (skins.find((s) => s.id === skin.id || s.classid === skin.classid || s.name === skin.name)) {
      continue
    }
    const createdSkin = await prisma.skin.create({
      data: skin
    })
    skins.push(createdSkin)
  }
  return skins
}

export async function updateSkins() {
  const csgobackpackData = await fetch(CSGO_BACKPACK_API).then((res) => res.json())
  console.log('')
  console.log('')
  console.log('')
  console.log('csgobackpackData', csgobackpackData)
  console.log('')
  console.log('')
  console.log('')
  // const skins = combineGrades(csgobackpackData)
  // console.log('')
  // console.log('')
  // console.log('')
  // console.log('skins', skins)
  // console.log('')
  // console.log('')
  // console.log('')
  // for (let i = 0; i < skins.length; i++) {
  //   if (!skins[i].prices || !skins[i].classid) {
  //     continue
  //   }
  //   await prisma.skin.update({
  //     where: {
  //       classid: skins[i].classid
  //     },
  //     data: {
  //       prices: skins[i].prices
  //     }
  //   })
  // }
}
