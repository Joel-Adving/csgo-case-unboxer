type GradeType =
  | 'Consumer'
  | 'Industrial Grade'
  | 'Mil-Spec Grade'
  | 'Restricted'
  | 'Classified'
  | 'Covert'
  | 'Extraordinary'

export type Case = {
  id: string
  name: string
  description: string
  type: string
  first_sale_date: string
  contains: Skin[]
  contains_rare: Skin[]
  image: string
}

export type Skin = {
  id: string
  name: string
  description: string
  weapon: string
  pattern: string
  min_float: number
  max_float: number
  rarity: GradeType
  stattrak: boolean
  image: string
}

export type Sticker = {
  id: string
  name: string
  description: string
  rarity: GradeType
  image: string
}

export type Collection = {
  id: string
  name: string
  image: string
}

export type SkinItem = {
  id: number
  name: string
  marketable: number
  tradable: number
  classid: string
  icon_url?: string
  icon_url_large?: string
  type: string
  weapon_type: string
  gun_type?: string
  souvenir?: number
  tournament?: string
  exterior?: string
  rarity: string
  rarity_color: string
  price: string
  first_sale_date?: string
  knife_type?: string
  image?: string
}

export type SkinPrice = {
  '7_days'?: SkinPricePeriod
  '30_days'?: SkinPricePeriod
  all_time?: SkinPricePeriod
}

export type SkinPricePeriod = {
  average: number
  median: number
  sold: string
  standard_deviation: string
  lowest_price: number
  highest_price: number
}
