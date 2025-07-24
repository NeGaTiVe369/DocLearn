import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import {
  loginSpecialist,
  registerSpecialist,
  verifySpecialistEmail,
  checkNewAuthStatus,
  logoutSpecialist,
} from "./newThunks"
import type { SpecialistUser } from "@/entities/user/model/newTypes"
import type { UpdateSpecialistFieldsPayload } from "./newTypes"

interface NewAuthState {
  user: SpecialistUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  registrationEmail: string | null
  isInitialized: boolean
}

const initialState: NewAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationEmail: null,
  isInitialized: false,
}

export const newAuthSlice = createSlice({
  name: "newAuth",
  initialState,
  reducers: {
    clearNewAuthError(state) {
      state.error = null
    },
    setNewRegistrationEmail(state, action: PayloadAction<string>) {
      state.registrationEmail = action.payload
    },
    clearNewRegistrationEmail(state) {
      state.registrationEmail = null
    },
    updateSpecialistFields(state, action: PayloadAction<UpdateSpecialistFieldsPayload>) {
      if (state.user) {
        const {
          defaultAvatarPath,
          location,
          birthday,
          bio,
          contacts,
          experience,
          stats,
          placeStudy,
          placeWork,
          role,
        } = action.payload

        if (defaultAvatarPath !== undefined) {
          state.user.defaultAvatarPath = defaultAvatarPath
        }
        if (location !== undefined) {
          state.user.location = location
        }
        if (birthday !== undefined) {
          state.user.birthday = birthday
        }
        if (bio !== undefined) {
          state.user.bio = bio
        }
        if (contacts !== undefined) {
          state.user.contacts = contacts
        }
        if (experience !== undefined) {
          state.user.experience = experience
        }
        if (stats !== undefined) {
          state.user.stats = {
            ...state.user.stats,
            ...stats,
          }
        }
        if (placeStudy !== undefined) {
          state.user.placeStudy = placeStudy
        }
        if (placeWork !== undefined) {
          state.user.placeWork = placeWork
        }

        // Обновление роли и роль-специфичных полей
        if (role !== undefined && role !== state.user.role) {
          // Смена роли - обновляем тип пользователя
          state.user.role = role
        }
      }
    },
  },
  extraReducers: (b) =>
    b
      // loginSpecialist
      .addCase(loginSpecialist.pending, (s) => {
        s.isLoading = true
        s.error = null
      })
      .addCase(loginSpecialist.fulfilled, (s, { payload }) => {
        s.isLoading = false
        s.user = payload
        s.isAuthenticated = true
      })
      .addCase(loginSpecialist.rejected, (s, { payload }) => {
        s.isLoading = false
        s.error = payload as string
      })

      // registerSpecialist
      .addCase(registerSpecialist.pending, (s) => {
        s.isLoading = true
        s.error = null
      })
      .addCase(registerSpecialist.fulfilled, (s) => {
        s.isLoading = false
      })
      .addCase(registerSpecialist.rejected, (s, { payload }) => {
        s.isLoading = false
        s.error = payload as string
      })

      // verifySpecialistEmail
      .addCase(verifySpecialistEmail.pending, (s) => {
        s.isLoading = true
        s.error = null
      })
      .addCase(verifySpecialistEmail.fulfilled, (s, { payload }) => {
        s.isLoading = false
        s.user = payload
        s.isAuthenticated = true
        s.registrationEmail = null
      })
      .addCase(verifySpecialistEmail.rejected, (s, { payload }) => {
        s.isLoading = false
        s.error = payload as string
      })

      // checkNewAuthStatus
      .addCase(checkNewAuthStatus.pending, (s) => {
        s.isLoading = true
      })
      .addCase(checkNewAuthStatus.fulfilled, (s, { payload }) => {
        s.isLoading = false
        s.user = payload
        s.isAuthenticated = Boolean(payload)
        s.isInitialized = true
      })
      .addCase(checkNewAuthStatus.rejected, (s) => {
        s.isLoading = false
        s.isInitialized = true
        s.user = null
        s.isAuthenticated = false
      })

      // logoutSpecialist
      .addCase(logoutSpecialist.fulfilled, (s) => {
        s.user = null
        s.isAuthenticated = false
      }),
})

export const { clearNewAuthError, setNewRegistrationEmail, clearNewRegistrationEmail, updateSpecialistFields } =
  newAuthSlice.actions
export default newAuthSlice.reducer
