import { Case } from '@/types'
import { API_URL } from '@/utils/constants'

async function get<T>({ query, error = 'Internal Server Error' }: { query: string; error?: string }) {
  const res = await fetch(API_URL + query + '.json')
  const cases: T = await res.json()
  if (!cases) {
    throw new Error(error)
  }
  return cases
}

export async function getCases() {
  return get<Case[]>({
    query: 'crates/cases',
    error: 'Could not fetch cases'
  })
}

export async function getSouvenirs() {
  return get<Case[]>({
    query: 'crates/souvenir',
    error: 'Could not fetch souvenirs'
  })
}
