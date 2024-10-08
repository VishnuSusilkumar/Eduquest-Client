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
    getInstructorData: builder.query({
      query: (id) => ({
        url: `admin/get-instuctor-data/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addFAQ: builder.mutation({
      query: (questions) => ({
        url: "admin/add-faq",
        method: "POST",
        body: questions,
        credentials: "include" as const,
      }),
    }),
    getFAQ: builder.query({
      query: () => ({
        url: "admin/get-faq",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    verifyUser: builder.mutation({
      query: ({ id }) => ({
        url: `admin/verify-user/${id}`,
        method: "PATCH",
        credentials: "include" as const,
      }),
    }),
    blockUser: builder.mutation({
      query: ({ id }) => ({
        url: `admin/block-user/${id}`,
        method: "PATCH",
        credentials: "include" as const,
      }),
    }),
    unBlockUser: builder.mutation({
      query: ({ id }) => ({
        url: `admin/un-block-user/${id}`,
        method: "PATCH",
        credentials: "include" as const,
      }),
    }),
    getInstructorCourses: builder.query({
      query: () => ({
        url: "admin/get-instructor-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    blockCourse: builder.mutation({
      query: ({ id }) => ({
        url: `admin/block-course/${id}`,
        method: "PATCH",
        credentials: "include" as const,
      }),
    }),
    unBlockCourse: builder.mutation({
      query: ({ id }) => ({
        url: `admin/un-block-course/${id}`,
        method: "PATCH",
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
  useGetCategoriesQuery,
  useAddFAQMutation,
  useGetFAQQuery,
  useGetInstructorDataQuery,
  useVerifyUserMutation,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useGetInstructorCoursesQuery,
  useBlockCourseMutation,
  useUnBlockCourseMutation,
} = adminApi;
