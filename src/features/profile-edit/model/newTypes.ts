// import type {
//   SpecialistUser,
//   SpecialistRole,
//   Work,
//   Specialization,
//   ScientificStatus,
//   Education,
//   Contact,
// } from "@/entities/user/model/types"

// export interface NewUpdateProfileRequest {
//   firstName?: string
//   lastName?: string
//   middleName?: string
//   birthday?: string
//   bio?: string
//   location?: string
//   experience?: string
//   placeWork?: string
//   placeStudy?: string
//   mainSpecialization?: string
//   role?: SpecialistRole
//   contacts?: Omit<Contact, "_id">[]
//   education?: Omit<Education, "id">[]
//   workHistory?: Omit<Work, "id">[]
//   specializations?: Omit<Specialization, "id">[]
//   scientificStatus?: ScientificStatus
//   defaultAvatarPath?: string
//   avatar?: string
// }

// export interface NewUpdateProfileResponse {
//   success: boolean
//   message: string
//   data: {
//     requiresModeration: boolean
//     user: SpecialistUser
//   }
// }

// export interface NewUploadAvatarResponse {
//   success: boolean
//   message: string
//   data: {
//     avatarUrl: string
//     avatarUrlTimestamp: number
//   }
// }
