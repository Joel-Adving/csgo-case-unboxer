import { SkinItem } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getDbSkins: builder.query<SkinItem[], null>({
      query: () => '/skins'
    })
  })
})

export const { useGetDbSkinsQuery } = api
