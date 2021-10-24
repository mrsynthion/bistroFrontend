import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const menuItemsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8080',
    }),
    reducerPath:'MenuItems',
    endpoints:(builder)=> ({
        getMenuItems: builder.query({
            query: () => '/menuItems',

        })
    })
})


export const {useGetMenuItemsQuery} = menuItemsApi;












