import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const typesApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8080',

    }),
    reducerPath:'Types',
    endpoints:(builder)=> ({
        getTypes: builder.query({
            query: () => '/menuItemsTypes',
        })
    })
})


export const {useGetTypesQuery} = typesApi;
