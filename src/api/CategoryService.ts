import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from './baseQuery';

export const CategoryService = createApi({
    reducerPath: 'CategoryService',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
      getCategories: builder.query<any, any>({
        query: () => ({
          url: '/category',
          method: 'GET'
        })
      }),
      createCategory: builder.mutation<any, any>({
        query: (body) => ({
          url: '/category/create',
          method: 'POST',
          body
        })
      }),
      updateCategory: builder.mutation<any, any>({
        query: (body) => ({
          url: '/category/update',
          method: 'PATCH',
          body
        })
      }),
      deleteCategory: builder.mutation<any, any>({
        query: ({body, categoryId}) => ({
          url: `/category/delete/${categoryId}`,
          method: 'DELETE',
          body
        })
      })
    })
});
  
export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = CategoryService;