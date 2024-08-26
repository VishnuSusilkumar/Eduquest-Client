import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "admin/get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getInstructors: builder.query({
      query: () => ({
        url: "admin/get-instructors",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addCategories: builder.mutation({
      query: (categories) => ({
        url: "admin/add-categories",
        method: "POST",
        body: categories,
        credentials: "include" as const,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "admin/get-categories",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetInstructorsQuery,
  useAddCategoriesMutation,
  useGetCategoriesQuery
} = adminApi;
