export const BYMYKEL_API_URL = 'https://bymykel.github.io/CSGO-API/api/en/'

export const REAL_RARITY_PERCENTAGES = {
  rare: 0.7992, // 79.92%
  mythical: 0.1598, // 15.98%
  legendary: 0.032, // 3.2%
  ancient: 0.0064, // 0.64%
  exceedinglyRare: 0.0026 // 0.26%
} as const

export const FUN_RARITY_PERCENTAGES = {
  rare: 0.05,
  mythical: 0.1,
  legendary: 0.4,
  ancient: 0.3,
  exceedinglyRare: 0.15
} as const

export const RARITY = {
  rare: ['Consumer Grade', 'Industrial Grade', 'Mil-Spec Grade'],
  mythical: ['Restricted'],
  legendary: ['Classified'],
  ancient: ['Covert', 'Extraordinary'],
  exceedinglyRare: ['Knife', 'Gloves', 'Contraband']
}

export const RARITY_INDEX = {
  'Consumer Grade': 0,
  'Industrial Grade': 1,
  'Mil-Spec Grade': 2,
  Restricted: 3,
  Classified: 4,
  Covert: 5,
  Extraordinary: 6
} as const
