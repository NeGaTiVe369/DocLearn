import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { UpdateProfileRequest, UpdateProfileResponse } from "../model/types"

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dl-back-756832582185.us-east1.run.app",
  prepareHeaders: (headers) => {
    const refreshToken = localStorage.getItem("refreshToken")
    if (refreshToken) {
      headers.set("Authorization", `Bearer ${refreshToken}`)
    }
    headers.set("Content-Type", "application/json")
    return headers
  },
  credentials: "include",
})

export const profileEditApi = createApi({
  reducerPath: "profileEditApi",
  // Обновляем tagTypes, чтобы использовать только "Profile"
  tagTypes: ["Profile"],
  baseQuery,
  endpoints: (builder) => ({
    updateMyProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (data) => ({
        url: "/user/update-my-profile",
        method: "POST",
        body: data,
      }),
      // Инвалидируем общий тег "Profile" и, возможно, конкретный профиль текущего пользователя
      invalidatesTags: (result, error, arg) => {
        const tags = [{ type: "Profile" as const, id: "LIST" }] // Общий список профилей
        if (result?.data?._id) {
          tags.push({ type: "Profile", id: result.data._id }) // Конкретный профиль
        }
        return tags
      },
    }),

    followUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (userId) => ({
        url: `/user/${userId}/follow`,
        method: "POST",
      }),
      // Инвалидируем тег "Profile" для конкретного userId
      invalidatesTags: (result, error, userId) => [{ type: "Profile", id: userId }],
    }),

    unfollowUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (userId) => ({
        url: `/user/${userId}/follow`,
        method: "DELETE",
      }),
      // Инвалидируем тег "Profile" для конкретного userId
      invalidatesTags: (result, error, userId) => [{ type: "Profile", id: userId }],
    }),

    checkFollowStatus: builder.query<{ success: boolean; data: { isFollowing: boolean } }, string>({
      query: (userId) => ({
        url: `/user/${userId}/is-following`,
        method: "GET",
      }),
      providesTags: ["Profile"], // Этот тег может быть более специфичным, если нужно
    }),
  }),
})

export const { useUpdateMyProfileMutation, useFollowUserMutation, useUnfollowUserMutation, useCheckFollowStatusQuery } =
  profileEditApi
