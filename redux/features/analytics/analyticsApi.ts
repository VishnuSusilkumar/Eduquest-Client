import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalytics: builder.query({
      query: (id) => ({
        url: `courses/get-course-analytics/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getUsersAnalytics: builder.query({
      query: (id) => ({
        url: `user/get-users-analytics/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getOrdersAnalytics: builder.query({
      query: (id) => ({
        url: `order/get-orders-analytics/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getInstructorCoursesAndUserCount: builder.query({
      query: (id) => ({
        url: `user/get-instructor-courses-and-user-count/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetCourseAnalyticsQuery,
  useGetUsersAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
  useGetInstructorCoursesAndUserCountQuery,
} = analyticsApi;
