import type React from "react"
import type { Post } from "@/entities/post/model/types"
import type { Course } from "@/entities/course/model/types"

export interface MenuItem {
  label: string
  value?: string
  href: string
  icon?: React.ReactNode
}

export interface UserProfile {
  name: string
  role: string
  avatar: string
}

//типы для научного статуса
export type AcademicDegree = "Кандидат медицинских наук" | "Доктор медицинских наук"
export type AcademicTitle = "Доцент" | "Профессор"
export type AcademicRank = "Член-корреспондент РАН" | "Академик РАН"

export interface ScientificStatus {
  degree: AcademicDegree | null
  title: AcademicTitle | null
  rank: AcademicRank | null
  interests: string[]
}

//типы для специализаций врача
export type SpecializationMethod = "Ординатура" | "Профессиональная переподготовка"
export type QualificationCategory = "Вторая категория" | "Первая категория" | "Высшая категория"

export interface Specialization {
  id: string
  name: string
  method: SpecializationMethod
  qualificationCategory: QualificationCategory
}

//тип для места работы
export interface Work {
  id: string
  organizationId?: string
  organizationName: string
  position: string
  startDate: string
  endDate?: string
  isCurrently: boolean
}

export interface Contact {
  _id: string
  type: string
  label?: string
  value: string
  isPublic?: boolean
}

export interface BaseEducation {
  id: string
  institution: string
  specialty: string
  startDate: string
  graduationYear: string
  isCurrently: boolean
}

export interface StudentEducation extends BaseEducation {
  degree: "Специалитет"
}

export interface GeneralEducation extends BaseEducation {
  degree: string
}

//тип верификации с новыми ролями
export interface UserVerification {
  user: boolean
  doctor: boolean
  student: boolean
  resident: boolean // ординатор
  postgraduate: boolean // аспирант
  researcher: boolean // научный сотрудник
}

export interface UserStats {
  followingCount: number
  followersCount: number
  postsCount?: number
}

export interface BaseUserFields {
  _id: string
  firstName: string
  lastName: string
  middleName?: string
  email: string
  birthday: string
  placeStudy: string // место учебы, новое поле 
  placeWork: string
  workHistory: Work[] // история мест работы, новое поле
  mainSpecialization: string // новое поле для основной специализации
  isVerified: UserVerification
  createdAt: string
  avatar?: string
  defaultAvatarPath: string
  avatarUrl?: string
  avatarUrlTimestamp?: number
  location: string
  followers: string[]
  following: string[]
  rating: number
  publications: Post[]
  bio: string
  achievements: Achievement[]
  stats: UserStats
  contacts: Contact[]
  experience: string // общее поле для всех ролей
}

// Студент
export interface StudentUser extends BaseUserFields {
  role: "student"
  mentorId?: string
  coursesEnrolled?: Course[]
  education: StudentEducation

}

// Ординатор
export interface ResidentUser extends Omit<StudentUser, "role" | "education"> {
  role: "resident"
  education: GeneralEducation[]
}

// Аспирант
export interface PostgraduateUser extends Omit<ResidentUser, "role"> {
  role: "postgraduate"
  scientificStatus: ScientificStatus
}

// Врач
export interface DoctorUser extends Omit<PostgraduateUser, "role"> {
  role: "doctor"
  specializations: Specialization[]
}

// Научный сотрудник
export interface ResearcherUser extends Omit<DoctorUser, "role"> {
  role: "researcher"
}

// Админ
export interface AdminUser extends BaseUserFields {
  role: "admin"
  education: GeneralEducation[]
}

// Union type для всех типов пользователей-специалистов
export type SpecialistUser = StudentUser | ResidentUser | PostgraduateUser | DoctorUser | ResearcherUser | AdminUser

export type SpecialistRole = "student" | "resident" | "postgraduate" | "doctor" | "researcher" | "admin"

export interface Achievement {
  id: string
  title: string
  description: string
  earnedDate: string
  category: "education" | "publication" | "rating" | "experience" | "other"
}
