import { BymykelCrateType } from '@/types'
import { BYMYKEL_API_URL } from '@/utils/constants'
import { Crate } from '@prisma/client'

async function get<T>({
  query,
  baseUrl = process.env.API_URL,
  error = 'Internal Server Error'
}: {
  query: string
  baseUrl?: string
  error?: string
}) {
  const res = await fetch(baseUrl + query)
  const data: T = await res.json()
  if (!data) {
    throw new Error(error)
  }
  return data
}

function getBymykelData<T>(query: string) {
  return get<T>({
    baseUrl: BYMYKEL_API_URL,
    query: query + '.json'
  })
}

export function getBymykelCases() {
  return getBymykelData<BymykelCrateType[]>('crates/cases')
}

export function getBymykelSouvenirs() {
  return getBymykelData<BymykelCrateType[]>('crates/souvenir')
}

export function getCases() {
  return get<Crate[]>({
    query: 'crates/cases'
  })
}

export function getSouvenirs() {
  return get<Crate[]>({
    query: 'crates/souvenirs'
  })
}

export function authorized(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  return token && token === process.env.API_TOKEN
}
