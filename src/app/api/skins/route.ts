import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

const BASE_URL = 'https://csgobackpack.net/api/GetItemsList/v2/'

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
  rarity: string
  rarity_color: string
  price: string
  first_sale_date: string
  knife_type: string
}

const excludedKeys = [
  'StatTrak™',
  'Sticker',
  'Patch',
  'Sealed Graffiti',
  '(Minimal Wear)',
  '(Field-Tested)',
  '(Well-Worn)',
  '(Battle-Scarred)'
]

const filterData = (data: any) => {
  const items: SkinRequestData[] = []
  for (const [key, value] of Object.entries(data.items_list)) {
    if (!excludedKeys.some((item) => key.includes(item))) {
      items.push(value as SkinRequestData)
    }
  }
  return items.filter((item) => item.type === 'Weapon' || item.type === 'Gloves')
}

export async function GET() {
  const skins = await prisma.skin.findMany()
  return NextResponse.json(skins)
}

export async function POST() {
  const res = await fetch(BASE_URL)
  const data = await res.json()
  const filteredData = filterData(data)
  const skins = []

  try {
    for (let i = 0; i < filteredData.length; i++) {
      const skin = await prisma.skin.create({
        data: filteredData[i]
      })
      skins.push(skin)
    }

    return NextResponse.json(skins)
  } catch (e) {
    return NextResponse.error()
  }
}

export async function PUT() {
  const res = await fetch(BASE_URL)
  const data = await res.json()
  const filteredData = filterData(data)

  try {
    for (let i = 0; i < filteredData.length; i++) {
      await prisma.skin.update({
        where: {
          classid: filteredData[i].classid
        },
        data: {
          price: filteredData[i].price
        }
      })
    }
    return NextResponse.json({ message: 'success' })
  } catch (e) {
    return NextResponse.error()
  }
}
