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
