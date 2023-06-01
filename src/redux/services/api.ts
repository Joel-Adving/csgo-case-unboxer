import { Skin } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getSkins: builder.query<Skin[], null>({
      query: () => '/skins'
    })
  })
})

export const { useGetSkinsQuery } = api
