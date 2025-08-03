// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import type { SpecialistRole, Contact, Work, Specialization, ScientificStatus } from "@/entities/user/model/types"
// import { updateSpecialistFields } from "@/features/auth/model/newSlice"

// interface UpdateSpecialistProfileRequest {
//   firstName?: string
//   lastName?: string
//   middleName?: string
//   birthday?: string
//   placeStudy?: string
//   placeWork?: string
//   mainSpecialization?: string
//   location?: string
//   bio?: string
//   experience?: string
//   role?: SpecialistRole
//   contacts?: Omit<Contact, "_id">[]
//   workHistory?: Omit<Work, "id">[]
//   specializations?: Omit<Specialization, "id">[]
//   scientificStatus?: ScientificStatus
//   avatar?: string
//   defaultAvatarPath?: string
// }

// interface UpdateSpecialistProfileResponse {
//   success: boolean
//   data: {
//     message: string
//     requiresModeration: boolean
//   }
// }

// interface UploadAvatarResponse {
//   success: boolean
//   data: {
//     message: string
//     avatarUrl: string
//   }
// }

// const baseQuery = fetchBaseQuery({
//   baseUrl: "https://api.doclearn.ru",
//   prepareHeaders: (headers, { endpoint }) => {
//     const refreshToken = localStorage.getItem("refreshToken")
//     if (refreshToken) {
//       headers.set("Authorization", `Bearer ${refreshToken}`)
//     }

//     if (endpoint !== "uploadAvatar") {
//       headers.set("Content-Type", "application/json")
//     }

//     return headers
//   },
//   credentials: "include",
// })

// export const newProfileEditApi = createApi({
//   reducerPath: "newProfileEditApi",
//   tagTypes: ["SpecialistProfile", "UserProfile"],
//   baseQuery,
//   endpoints: (builder) => ({
//     updateSpecialistProfile: builder.mutation<UpdateSpecialistProfileResponse, UpdateSpecialistProfileRequest>({
//       query: (data) => ({
//         url: "/specialist/update-profile", // Новый эндпоинт для специалистов
//         method: "POST",
//         body: data,
//       }),
//       onQueryStarted: async (requestData, { dispatch, queryFulfilled }) => {
//         try {
//           const { data: responseData } = await queryFulfilled

//           if (responseData.success) {
//             const fieldsToUpdate: any = {}

//             // Обновляем поля в Redux store
//             Object.keys(requestData).forEach((key) => {
//               if (requestData[key as keyof UpdateSpecialistProfileRequest] !== undefined) {
//                 fieldsToUpdate[key] = requestData[key as keyof UpdateSpecialistProfileRequest]
//               }
//             })

//             if (Object.keys(fieldsToUpdate).length > 0) {
//               dispatch(updateSpecialistFields(fieldsToUpdate))
//             }
//           }
//         } catch (error) {
//           console.error("Failed to update specialist profile:", error)
//         }
//       },
//       invalidatesTags: (result, error) => {
//         if (error) return []
//         return [
//           { type: "SpecialistProfile" as const, id: "LIST" },
//           { type: "SpecialistProfile" as const, id: "ME" },
//           { type: "UserProfile" as const, id: "LIST" },
//           { type: "UserProfile" as const, id: "ME" },
//           "SpecialistProfile",
//           "UserProfile",
//         ]
//       },
//     }),

//     uploadSpecialistAvatar: builder.mutation<UploadAvatarResponse, File>({
//       query: (file) => {
//         const formData = new FormData()
//         formData.append("avatar", file)
//         return {
//           url: "/specialist/avatar", // Новый эндпоинт для аватаров специалистов
//           method: "POST",
//           body: formData,
//         }
//       },
//       invalidatesTags: (result, error) => {
//         if (error) return []
//         return [
//           { type: "SpecialistProfile" as const, id: "LIST" },
//           { type: "SpecialistProfile" as const, id: "ME" },
//           { type: "UserProfile" as const, id: "LIST" },
//           { type: "UserProfile" as const, id: "ME" },
//           "SpecialistProfile",
//           "UserProfile",
//         ]
//       },
//     }),

//     // Методы для работы с подписками остаются теми же
//     followSpecialist: builder.mutation<{ success: boolean; message: string }, string>({
//       query: (userId) => ({
//         url: `/specialist/${userId}/follow`,
//         method: "POST",
//       }),
//       invalidatesTags: (_result, _error, userId) => [
//         { type: "SpecialistProfile", id: userId },
//         { type: "UserProfile", id: userId },
//       ],
//     }),

//     unfollowSpecialist: builder.mutation<{ success: boolean; message: string }, string>({
//       query: (userId) => ({
//         url: `/specialist/${userId}/follow`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (_result, _error, userId) => [
//         { type: "SpecialistProfile", id: userId },
//         { type: "UserProfile", id: userId },
//       ],
//     }),
//   }),
// })

// export const {
//   useUpdateSpecialistProfileMutation,
//   useUploadSpecialistAvatarMutation,
//   useFollowSpecialistMutation,
//   useUnfollowSpecialistMutation,
// } = newProfileEditApi
