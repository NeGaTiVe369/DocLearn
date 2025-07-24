import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import http from "@/shared/api/http"
import type { SpecialistUser } from "@/entities/user/model/newTypes"
import type { LoginDto, RegisterSpecialistDto, VerifyDto } from "./newTypes"
import { clearNewAuthError, setNewRegistrationEmail } from "./newSlice"

interface RefreshTokenResponse {
  refreshToken: string
}

interface SpecialistUserResponse {
  success: boolean
  data: SpecialistUser
}

interface ErrorResponse {
  message?: string
}

interface LoginSpecialistResponse {
  user: SpecialistUser
  refreshToken: string
}

async function fetchSpecialistProfile(): Promise<SpecialistUser> {
  const { data } = await http.get<SpecialistUserResponse>("/user/me")
  console.log("Данные от /user/me:", data.data)
  return data.data
}

export const loginSpecialist = createAsyncThunk<SpecialistUser, LoginDto, { rejectValue: string }>(
  "newAuth/loginSpecialist",
  async (dto, { rejectWithValue }) => {
    try {
      const response = await http.post<LoginSpecialistResponse>("/auth/login", dto)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      return response.data.user
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 400) {
          return rejectWithValue("Неверный логин или пароль")
        }
        return rejectWithValue((err.response.data as ErrorResponse)?.message ?? err.message)
      }
      return rejectWithValue((err as Error).message)
    }
  },
)

export const registerSpecialist = createAsyncThunk<void, RegisterSpecialistDto, { rejectValue: string }>(
  "newAuth/registerSpecialist",
  async (dto, { dispatch, rejectWithValue }) => {
    try {
      await http.post("/auth/register", dto)
      dispatch(setNewRegistrationEmail(dto.email))
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        return rejectWithValue("Пользователь с такой почтой уже существует")
      }
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue((err.response.data as ErrorResponse)?.message ?? err.message)
      }
      return rejectWithValue((err as Error).message)
    }
  },
)

export const verifySpecialistEmail = createAsyncThunk<SpecialistUser, VerifyDto, { rejectValue: string }>(
  "newAuth/verifySpecialistEmail",
  async (dto, { rejectWithValue }) => {
    try {
      const response = await http.post<LoginSpecialistResponse>("/auth/verify-email", dto)
      console.log("verify-email: ", response)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      return response.data.user
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          return rejectWithValue("Неверный код подтверждения")
        }
        if (err.response.status === 500) {
          return rejectWithValue("Ошибка. Проверьте корректность кода или попробуйте позже")
        }
        return rejectWithValue((err.response.data as ErrorResponse)?.message ?? err.message)
      }
      return rejectWithValue((err as Error).message)
    }
  },
)

export const checkNewAuthStatus = createAsyncThunk<SpecialistUser | null>("newAuth/checkNewAuthStatus", async () => {
  try {
    const rt = localStorage.getItem("refreshToken")
    if (!rt) return null
    return await fetchSpecialistProfile()
  } catch {
    return null
  }
})

export const logoutSpecialist = createAsyncThunk<void, void, { rejectValue: string }>(
  "newAuth/logoutSpecialist",
  async (_, { rejectWithValue }) => {
    try {
      await http.delete("/auth/logout")
      localStorage.removeItem("refreshToken")
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        return rejectWithValue("Токен не найден")
      }
      localStorage.removeItem("refreshToken")
    }
  },
)

export { clearNewAuthError }
