// olympiad.ts
import type {
  BaseAnnouncement,
  AnnouncementCategory,
  AnnouncementLocationType,
  Currency,
  PriceType,
  Language,
  TargetAudience,
} from './base'

export type OlympiadLevel =
  | 'intrauniversity' // внутривузовская
  | 'regional'
  | 'national'
  | 'international'

export type CompetitionFormat = 'individual' | 'team' | 'both'

export type OlympiadSubject =
  | 'anatomy'
  | 'physiology'
  | 'biochemistry'
  | 'pathology'
  | 'pharmacology'
  | 'histology'
  | 'embryology'
  | 'microbiology'
  | 'internal_medicine'
  | 'surgery'
  | 'pediatrics'
  | 'radiology'
  | 'statistics'
  | 'public_health'
  | 'ethics'
  | 'first_aid'
  | 'other'

export type ExamKind =
  | 'mcq'            // тесты с выбором ответа
  | 'free_response'  // развернутые ответы/эссе
  | 'osce'           // практические станции/skills
  | 'case'           // клинические кейсы
  | 'practical'      // лабораторные/технические задания
  | 'team_bowl'      // быстрые командные раунды (science bowl)
  | 'presentation'   // постер/доклад

export interface TeamRules {
  minSize?: number
  maxSize?: number
  sameInstitutionRequired?: boolean
  supervisorRequired?: boolean
  notes?: string
}

export type EducationLevel =
  | 'high_school'
  | 'medical_undergraduate'
  | 'medical_postgraduate'
  | 'mixed'

export interface Eligibility {
  educationLevel: EducationLevel
  yearsAllowed?: { min?: number; max?: number } // например: {min:1,max:6}
  specialtiesAllowed?: string[] // медицина/стоматология/медбио и т.п.
  ageMin?: number
  ageMax?: number
  citizenshipOrResidency?: string // ограничения (если есть)
  prerequisites?: string[]        // требуемые курсы/навыки/документы
}

export interface Round {
  name: string
  stage: 'qualifier' | 'semi_final' | 'final' | 'other'
  mode: AnnouncementLocationType // online/offline/hybrid
  dateFrom?: string
  dateTo?: string
  subjects?: OlympiadSubject[]
  examKinds?: ExamKind[]
  durationMinutes?: number
  weightPercent?: number
  proctoring?: 'online_proctoring' | 'in_person_proctoring' | 'none'
  description?: string
}

export interface Scoring {
  ranking: 'individual' | 'team' | 'both'
  totalPoints?: number
  passingScore?: number
  tieBreakers?: string[]
  notes?: string
}

export type AwardType =
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'first_place'
  | 'honorable_mention'
  | 'cash'
  | 'scholarship'
  | 'certificate'
  | 'trophy'
  | 'qualification' // отбор на следующий уровень (нац/междунар.)

export interface Award {
  type: AwardType
  title?: string              // наименование награды
  details?: string            // описание/условия
  monetaryAmount?: number
  currency?: Currency
  qualifiesFor?: string       // например: "IMDO"
}

export interface Logistics {
  accommodationProvided?: boolean
  travelReimbursed?: 'none' | 'partial' | 'full'
  mealsProvided?: boolean
  visaSupport?: boolean
  notes?: string
}

export interface JuryMember {
  name: string
  role?: string
  affiliation?: string
}

export interface OlympiadDocs {
  rulesUrl?: string          // положение/регламент
  syllabusUrl?: string       // программа/учебный план
  scheduleUrl?: string       // расписание
  registrationGuideUrl?: string
  pastPapersUrl?: string     // прошлые задания/демо
}

export interface Olympiad extends BaseAnnouncement {
  // таксономия и формат
  olympiadLevel: OlympiadLevel
  competitionFormat: CompetitionFormat
  subjects: OlympiadSubject[]

  // участие
  teamRules?: TeamRules
  eligibility: Eligibility

  // этапы и оценивание
  rounds: Round[]
  scoring?: Scoring
  awards?: Award[]

  // квоты/вместимость
  maxParticipants?: number
  currentParticipants?: number
  maxTeams?: number

  // регистрация и дедлайны (в унисон с другими сущностями)
  registrationRequired?: boolean
  registrationLink?: string
  registrationOpenAt?: string
  registrationCloseAt?: string
  documentsRequired?: string[] // справка о зачислении, студент. билет и т.д.

  // взносы
  price?: number              // регистрационный взнос; может отсутствовать
  price_type: PriceType       // 'free' | 'paid'
  currency: Currency

  // организаторы/жюри/партнеры
  hostOrganization?: string   // базовый вуз/центр (если отличается от organizer)
  venueName?: string
  jury?: JuryMember[]
  sponsors?: string[]

  // логистика
  logistics?: Logistics

  // материалы
  docs?: OlympiadDocs

  // медиа
  previewImage?: string
  gallery?: string[]

  // общие поля каталога
  categories: AnnouncementCategory[]
  targetAudience?: TargetAudience[]
  language?: Language

  level: string // человекочитаемый уровень олимпиады
  participationFormat: string // человекочитаемый формат участия
  registrationDeadline: string // дедлайн регистрации
  registrationFee?: number // стоимость регистрации
}
