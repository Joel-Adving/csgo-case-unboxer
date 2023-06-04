import { CrateType, Skin } from '@/types'
import { Crate } from '@prisma/client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getSkins: builder.query<Skin[], null>({
      query: () => '/skins'
    }),
    getCrates: builder.query<Crate[], null>({
      query: () => '/crates'
    }),
    getCrateSkins: builder.query<CrateType, string>({
      query: (id) => `/crates/${id}`
    })
  })
})

export const { useGetSkinsQuery, useGetCratesQuery, useGetCrateSkinsQuery } = api
