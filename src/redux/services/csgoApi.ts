import { Case } from '@/types'
import { API_URL } from '@/utils/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const csgoApi = createApi({
  reducerPath: 'csgoApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCases: builder.query<Case[], null>({
      query: () => '/crates/cases.json'
    }),
    getSouvenirs: builder.query<Case[], null>({
      query: () => '/crates/souvenir.json'
    })
  })
})

export const { useGetCasesQuery, useGetSouvenirsQuery } = csgoApi
