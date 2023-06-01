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
  'Sealed Graffiti'
  //   '(Minimal Wear)',
  //   '(Field-Tested)',
  //   '(Well-Worn)',
  //   '(Battle-Scarred)'
]

// {
// "name": "AK-47 | Aquamarine Revenge (Battle-Scarred)",
// "marketable": 1,
// "tradable": 1,
// "classid": "1759174527",
// "icon_url": "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWNU6dNoxL3H94qm3Ffm_RE6amn2ctWXdlI2ZwqB-FG_w-7s0ZK-7cjLzyE37HI8pSGKrIDGOAI",
// "icon_url_large": "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWNU6dNoteXA54vwxgCyqRVvZzrxItTDewY7NwvS_gW2x7y-h5a9vp3KnXZh63Ug4yyJyUepwUYbPABm4j8",
// "type": "Weapon",
// "weapon_type": "Rifle",
// "gun_type": "AK-47",
// "exterior": "Battle-Scarred",
// "rarity": "Covert",
// "rarity_color": "eb4b4b",
// "price": {
//     "24_hours": {
//     "average": 19.28,
//     "median": 19.13,
//     "sold": "71",
//     "standard_deviation": "3.11",
//     "lowest_price": 18.38,
//     "highest_price": 20.83
//     },
//     "7_days": {
//     "average": 19.59,
//     "median": 19.26,
//     "sold": "381",
//     "standard_deviation": "11.9",
//     "lowest_price": 14.9,
//     "highest_price": 43.58
//     },
//     "30_days": {
//     "average": 20.25,
//     "median": 19.92,
//     "sold": "1726",
//     "standard_deviation": "10.03",
//     "lowest_price": 14.81,
//     "highest_price": 43.58
//     },
//     "all_time": {
//     "average": 13.5,
//     "median": 15.77,
//     "sold": "213295",
//     "standard_deviation": "30.74",
//     "lowest_price": 6.75,
//     "highest_price": 43.58
//     }
// },
// "first_sale_date": "1432764000"
// }

const filterData = (data: any) => {
  const combined = combineSkins(data.items_list)

  const items: SkinRequestData[] = []

  for (const [key, value] of Object.entries(combined)) {
    if (!excludedKeys.some((item) => key.includes(item))) {
      items.push(value as SkinRequestData)
    }
  }
  return items.filter((item) => item.type === 'Weapon' || item.type === 'Gloves')
}

// export async function GET() {
//   const skins = await prisma.skin.findMany()
//   return NextResponse.json(skins)
// }

export async function GET() {
  const res = await fetch(BASE_URL)
  const data = await res.json()
  return NextResponse.json(filterData(data))
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

// make a javascript function that takes in an object as parameter
// the objects consist of key value pars, where the key is the name of the weapon skin, and the value is an object with various values.

// here is an example of how  the value for the key looks like:

// {
// "name": "AK-47 | Aquamarine Revenge (Battle-Scarred)",
// "marketable": 1,
// "tradable": 1,
// "classid": "1759174527",
// "icon_url": "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWNU6dNoxL3H94qm3Ffm_RE6amn2ctWXdlI2ZwqB-FG_w-7s0ZK-7cjLzyE37HI8pSGKrIDGOAI",
// "icon_url_large": "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWNU6dNoteXA54vwxgCyqRVvZzrxItTDewY7NwvS_gW2x7y-h5a9vp3KnXZh63Ug4yyJyUepwUYbPABm4j8",
// "type": "Weapon",
// "weapon_type": "Rifle",
// "gun_type": "AK-47",
// "exterior": "Battle-Scarred",
// "rarity": "Covert",
// "rarity_color": "eb4b4b",
// "price": {
//     "24_hours": {
//     "average": 19.28,
//     "median": 19.13,
//     "sold": "71",
//     "standard_deviation": "3.11",
//     "lowest_price": 18.38,
//     "highest_price": 20.83
//     },
//     "7_days": {
//     "average": 19.59,
//     "median": 19.26,
//     "sold": "381",
//     "standard_deviation": "11.9",
//     "lowest_price": 14.9,
//     "highest_price": 43.58
//     },
//     "30_days": {
//     "average": 20.25,
//     "median": 19.92,
//     "sold": "1726",
//     "standard_deviation": "10.03",
//     "lowest_price": 14.81,
//     "highest_price": 43.58
//     },
//     "all_time": {
//     "average": 13.5,
//     "median": 15.77,
//     "sold": "213295",
//     "standard_deviation": "30.74",
//     "lowest_price": 6.75,
//     "highest_price": 43.58
//     }
// },
// "first_sale_date": "1432764000"
// }

// there are multiple key value pairs that will be similar in the object, the only difference will be the name and the price, examples:

// "name": "AK-47 | Aquamarine Revenge (Battle-Scarred)"
// "name": "AK-47 | Aquamarine Revenge (Factory-New)"
// "name": "AK-47 | Aquamarine Revenge (Field-Tested)"
// etc..

// what i want to do is to combine all the variations of the skin like this:

// "name": "AK-47 | Aquamarine Revenge"

// and have the "price" object be called "prices" instead and be composed of the different kinds, like this:

// prices: {
// Battle-Scarred:  "7_days": {
//     "average": 19.59,
//     "median": 19.26,
//     "sold": "381",
//     "standard_deviation": "11.9",
//     "lowest_price": 14.9,
//     "highest_price": 43.58
//     },
//     "30_days": {
//     "average": 20.25,
//     "median": 19.92,
//     "sold": "1726",
//     "standard_deviation": "10.03",
//     "lowest_price": 14.81,
//     "highest_price": 43.58
//     },
//     "all_time": {
//     "average": 13.5,
//     "median": 15.77,
//     "sold": "213295",
//     "standard_deviation": "30.74",
//     "lowest_price": 6.75,
//     "highest_price": 43.58
//     },
// Factory-New:  "7_days": {
//     "average": 19.59,
//     "median": 19.26,
//     "sold": "381",
//     "standard_deviation": "11.9",
//     "lowest_price": 14.9,
//     "highest_price": 43.58
//     },
//     "30_days": {
//     "average": 20.25,
//     "median": 19.92,
//     "sold": "1726",
//     "standard_deviation": "10.03",
//     "lowest_price": 14.81,
//     "highest_price": 43.58
//     },
//     "all_time": {
//     "average": 13.5,
//     "median": 15.77,
//     "sold": "213295",
//     "standard_deviation": "30.74",
//     "lowest_price": 6.75,
//     "highest_price": 43.58
//     }
// }

// make the function now

function combineSkins(skins: any) {
  const combinedSkins = {} as any
  for (const [key, value] of Object.entries(skins)) {
    const skinName = value?.name.split(' (')[0]
    if (!skinName) continue
    const skinCondition = value?.name.split(' (')[1]?.split(')')[0]
    if (combinedSkins[skinName]) {
      combinedSkins[skinName].prices[skinCondition] = value.price
    } else {
      const { icon_url, icon_url_large, price, name: _, ...rest } = value
      combinedSkins[skinName] = {
        ...rest,
        name: skinName,
        prices: {
          [skinCondition]: value.price
        }
      }
    }
  }
  return combinedSkins
}

// make a version weher it should return an array of objects with the combined skins
