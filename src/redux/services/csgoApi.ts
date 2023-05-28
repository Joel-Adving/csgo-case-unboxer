import { Case, Collection, Skin, Sticker } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const csgoApi = createApi({
  reducerPath: 'csgoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bymykel.github.io/CSGO-API/api/en' }),
  endpoints: (builder) => ({
    getSkins: builder.query<Skin[], null>({
      query: () => '/skins.json'
    }),
    getCases: builder.query<Case[], null>({
      query: () => '/crates/cases.json'
    }),
    getCapsules: builder.query<Sticker[], null>({
      query: () => '/stickers.json'
    }),
    getSouvenirs: builder.query<Case[], null>({
      query: () => '/crates/souvenir.json'
    }),
    getCollections: builder.query<Collection[], null>({
      query: () => '/collections.json'
    })
  })
})

export const { useGetSkinsQuery, useGetCapsulesQuery, useGetCasesQuery, useGetSouvenirsQuery, useGetCollectionsQuery } =
  csgoApi
