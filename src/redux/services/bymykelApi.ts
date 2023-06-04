import { BYMYKEL_API_URL } from '@/utils/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const csgoApi = createApi({
  reducerPath: 'csgoApi',
  baseQuery: fetchBaseQuery({ baseUrl: BYMYKEL_API_URL }),
  endpoints: (builder) => ({
    getBymykelCases: builder.query<any[], null>({
      query: () => '/crates/cases.json'
    }),
    getBymykelSouvenirs: builder.query<any[], null>({
      query: () => '/crates/souvenir.json'
    }),
    getCsgoApiSkins: builder.query<any[], null>({
      query: () => '/skins.json'
    })
  })
})

export const {} = csgoApi
