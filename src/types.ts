export type Skin = {
  id: number
  name: string
  classid: string
  type: string
  weapon_type: string
  gun_type: string
  rarity: string
  rarity_color: string
  prices: SkinPrices
  first_sale_date: string
  knife_type: string
  image: string
  skinId: string
  min_float: number
  max_float: number
  stattrak: boolean
}

type Ware = 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred'

type SkinPrices = {
  [key in Ware]?: SkinPricePeriod
}

type SkinPricePeriod = {
  '7_days'?: SkinPriceData
  '30_days'?: SkinPriceData
  all_time?: SkinPriceData
}

type SkinPriceData = {
  average: number
  median: number
  sold: string
  standard_deviation: string
  lowest_price: number
  highest_price: number
}

export type CrateType = {
  id: string
  name: string
  type: string
  skins?: Skin[]
  first_sale_date: string
  image: string
}

export type BymykelCrateType = {
  id: string
  name: string
  description: string
  type: string
  first_sale_date: string
  contains: any[]
  contains_rare: any[]
  image: string
}
