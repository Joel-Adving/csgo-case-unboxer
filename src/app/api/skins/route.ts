import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

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

const CSGO_BACKPACK_API = 'https://csgobackpack.net/api/GetItemsList/v2/'
const BYMYKEL_API = 'https://bymykel.github.io/CSGO-API/api/en/skins.json'
const excluded = ['StatTrak™', 'Sticker', 'Patch', 'Sealed Graffiti']

const authorized = (request: Request) => {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  return token && token === process.env.API_TOKEN
}

const combineGrades = (csgobackpackData: any) => {
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
      const { icon_url, icon_url_large, price, exterior, souvenir, tradable, marketable, tournament, name, ...rest } = value
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

const getSkinsData = async () => {
  const [csgobackpackData, bymykelData] = await Promise.all([
    fetch(CSGO_BACKPACK_API).then((res) => res.json()),
    fetch(BYMYKEL_API).then((res) => res.json())
  ])

  const combinedGrades = combineGrades(csgobackpackData)

  return combinedGrades.map((s) => {
    const bymykelSkin = bymykelData.find((skin: any) => skin.name.replace(/(?:%27|&#39)/g, "'").includes(s.name))
    if (!bymykelSkin) return s
    s.image = bymykelSkin?.image
    s.skinId = bymykelSkin?.id
    s.min_float = bymykelSkin?.min_float
    s.max_float = bymykelSkin?.max_float
    s.stattrak = bymykelSkin?.stattrak
    return s
  })
}

export async function GET() {
  const skins = await prisma.skin.findMany()
  return NextResponse.json(skins)
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ message: 'unauthorized' })
  }

  try {
    const data = await getSkinsData()
    const skins = []
    for (let i = 0; i < data.length; i++) {
      const skin = await prisma.skin.create({
        data: data[i]
      })
      skins.push(skin)
    }
    return NextResponse.json(skins)
  } catch (e) {
    return NextResponse.json({ message: 'Something went wrong' })
  }
}

export async function PUT(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ message: 'unauthorized' })
  }

  const csgobackpackData = await fetch(CSGO_BACKPACK_API).then((res) => res.json())
  const skins = combineGrades(csgobackpackData)

  try {
    for (let i = 0; i < skins.length; i++) {
      await prisma.skin.update({
        where: {
          classid: skins[i].classid
        },
        data: {
          prices: skins[i].prices
        }
      })
    }
    return NextResponse.json({ message: 'success' })
  } catch (e) {
    return NextResponse.json({ message: 'Something went wrong' })
  }
}
