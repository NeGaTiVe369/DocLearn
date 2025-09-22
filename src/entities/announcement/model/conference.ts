import type {
  BaseAnnouncement, 
  Speaker, 
  AnnouncementCategory, 
  TargetAudience, 
  Currency, 
  Language, 
  PriceType 
} from './base';

export interface Conference extends BaseAnnouncement {
  speakers: Speaker[]
  program?: string
  scheduleUrl?: string

  registrationRequired: boolean
  registrationLink?: string

  maxParticipants?: number
  currentParticipants: number

  price_type: PriceType
  price: number
  currency: Currency

  categories: AnnouncementCategory[]
  targetAudience: TargetAudience[]
  language: Language

  certificates: boolean
  cmeCredits?: number

  format: "online" | "offline" | "hybrid"
  previewImage?: string
}
