import type {
  AnnouncementType, 
  AnnouncementLocation, 
  AnnouncementContactInfo, 
  AnnouncementCategory, 
  TargetAudience, 
  Speaker,
  CustomSpeaker,
  Language, 
  PriceType, 
  Currency,
  ConferenceStage
} from "./base"
import type { MasterClassSkillLevel } from "./masterClass"


export interface CreateAnnouncementFormData {
  // Step 1: Category
  category: AnnouncementType | null

  // Step 2: Basic Information
  title: string
  organizerName: string
  organizerId: string
  activeFrom: string
  activeTo: string
  location: AnnouncementLocation
  format: "online" | "offline" | "hybrid"
  maxParticipants: number | null
  participantLimit: number | null
  price_type: PriceType
  price: number
  currency: Currency
  program: string
  speakers: Speaker[]
  customSpeakers?: CustomSpeaker[]
  certificates: boolean
  registrationRequired: boolean
  registrationLink: string
  contactInfo: AnnouncementContactInfo
  stages?: ConferenceStage[]
  hasStages?: boolean

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
  categories: AnnouncementCategory[]
  targetAudience: TargetAudience[]
  language: Language
  tags: string[]

  previewImage?: string

  // Предпросмотр
  isPromoted: boolean
}
