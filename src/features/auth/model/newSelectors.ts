import type { RootState } from "@/app/store"

export const selectNewAuth = (state: RootState) => state.newAuth
export const selectNewAuthUser = (state: RootState) => state.newAuth.user
export const selectNewAuthIsAuthenticated = (state: RootState) => state.newAuth.isAuthenticated
export const selectNewAuthIsLoading = (state: RootState) => state.newAuth.isLoading
export const selectNewAuthError = (state: RootState) => state.newAuth.error
export const selectNewAuthRegistrationEmail = (state: RootState) => state.newAuth.registrationEmail
export const selectNewAuthIsInitialized = (state: RootState) => state.newAuth.isInitialized
