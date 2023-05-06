type GradeType =
  | 'Consumer'
  | 'Industrial Grade'
  | 'Mil-Spec Grade'
  | 'Restricted'
  | 'Classified'
  | 'Covert'
  | 'Extraordinary'

export type CaseType = {
  id: string
  name: string
  description: string
  type: string
  first_sale_date: string
  contains: SkinType[]
  contains_rare: SkinType[]
  image: string
}

export type SkinType = {
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
