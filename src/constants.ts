export const API_URL = 'https://bymykel.github.io/CSGO-API/api/en/'

export const GRADE_LEVELS = {
  Consumer: 1,
  'Industrial Grade': 2,
  'Mil-Spec Grade': 3,
  Restricted: 4,
  Classified: 5,
  Covert: 6,
  Extraordinary: 7
} as const

export const GRADE_COLORS = {
  Consumer: 'border-gray-500',
  'Industrial Grade': 'border-blue-500',
  'Mil-Spec Grade': 'border-blue-500',
  Restricted: 'border-purple-500',
  Classified: 'border-red-500',
  Covert: 'border-yellow-500',
  Extraordinary: 'border-yellow-500'
} as const

export const ignoredCovertGunSkins = [
  'SSG 08',
  'AUG',
  'M4A4',
  'FAMAS',
  'Galil AR',
  'P90',
  'MP9',
  'MP7',
  'PP-Bizon',
  'MAC-10',
  'Sawed-Off',
  'Five-SeveN',
  'CZ75-Auto',
  'P250',
  'R8 Revolver'
]
