import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const sessId=localStorage.getItem("sessId")
export const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/',
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: (limit) => `member`,
      providesTags: ['Members'],

    }),
    getMember: builder.query({
        query: () => `member/get`,
        providesTags: ['Parents'],
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: 'member/register',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        invalidatesTags: ['Members', 'Parents']
      }),
    }),
    move: builder.mutation({
      query: (payload) => ({
        url: 'member/network/move',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        invalidatesTags: ['Members', 'Parents']
      }),
    }),

  }),
})

export const { 
  useGetAllQuery,
  useGetMemberQuery,
  useRegisterMutation,
  useMoveMutation
 } = memberApi
