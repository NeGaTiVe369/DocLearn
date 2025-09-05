import type { BaseAnnouncement, AnnouncementLocation, AnnouncementContactInfo } from "./base"
import type { AnnouncementCategories, TargetAudience, Speaker } from "./conference"
import type { MasterClassSkillLevel } from "./masterClass"

export type AnnouncementLanguage = "ru" | "en" | "multi"

export type AnnouncementType =
  | "conference"
  | "masterclass"
  | "course"
  | "webinar"
  | "internship"
  | "university"
  | "vacancy"
  | "equipment"

export interface CreateAnnouncementFormData {
  // Step 1: Category
  category: AnnouncementType | null

  // Step 2: Basic Information
  title: string
  organizer: string
  activeFrom: string
  activeTo: string
  startTime: string
  endTime: string
  location: AnnouncementLocation
  maxParticipants: number | null
  participantLimit: number | null
  price_type: "free" | "paid"
  price: number
  currency: "RUB" | "USD" | "EUR"
  program: string
  speakers: Speaker[]
  certificates: boolean
  registrationRequired: boolean
  registrationLink: string
  contactInfo: AnnouncementContactInfo

    // Master class specific fields
  skillLevel?: MasterClassSkillLevel
  materials?: string[]
  duration?: number
  equipment?: string[]
  handsOn?: boolean
  groupWork?: boolean

  // Webinar specific fields
  isRecorded?: boolean
  recordingLink?: string
  recordingAvailableUntil?: string
  platform?: string
  prerequisites?: string

  // Дополнительные детали
  description: string
  categories: AnnouncementCategories[]
  targetAudience: TargetAudience[]
  language: AnnouncementLanguage
  tags: string[]

  // Предпросмотр
  isPromoted: boolean
}
