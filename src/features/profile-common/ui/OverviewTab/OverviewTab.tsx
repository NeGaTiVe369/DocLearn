'use client'

import React, { useState } from 'react'
import type { AuthorProfile, StudentProfile } from '@/entities/user/model/types'
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import {
  Clock,
  Star,
  Plus,
  DollarSign,
  GraduationCap,
  Award,
  Trophy,
  FileBadge,
  Lightbulb,
  BookDown,
  LibraryBig,
  User as UserIcon,
} from 'lucide-react'
import styles from './OverviewTab.module.css'

interface OverviewTabProps {
  profile: AuthorProfile | StudentProfile
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ profile }) => {
  const [showMore, setShowMore] = useState(false)

  const currentUser = useSelector((state: RootState) => state.auth.user)
  const isOwner = currentUser?._id === profile._id

  const formatYear = (date: string) => new Date(date).getFullYear()

  const getEventIcon = (date: string, type: string) => {
    const day = new Date(date).getDate()
    const typeClass = type === 'conference' ? styles.conferenceIcon :
      type === 'webinar' ? styles.webinarIcon : ''
    return <div className={`${styles.eventIcon} ${typeClass}`}>{day}</div>
  }

  const appointmentData = {
    consultation: 'от 3 500 ₽',
    duration: '45 мин',
    rating: profile.rating,
    reviewsCount: 127,
    patientsCount: '2 400+',
    availableSlots: ['Сегодня 15:30', 'Завтра 10:00', 'Завтра 14:30'],
  };

  const achievementIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    education: GraduationCap,
    work: Trophy,
    rating: Star,
    content: LibraryBig,
    patent: Lightbulb,
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>О себе</h3>
          <div className={styles.aboutList}>
            {/* {(profile.bio || 'Информация отсутствует')
              .split(/\n{2,}/) // разделение по абзацам
              .map((paragraph, idx) => (
                <div key={idx} className={styles.aboutItem}>
                  <span className={styles.aboutIcon}>•</span>
                  <span style={{ whiteSpace: 'pre-wrap' }}>{paragraph}</span>
                </div>
            ))} */}

            {profile.bio ? (
              profile.bio.split(/\n{2,}/).map((paragraph, idx) => (
                <p
                  key={idx}
                  style={{ whiteSpace: "pre-wrap", marginBottom: "0.75rem", color: "#4b5563", fontSize: "0.875rem" }}
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p style={{ color: "#6b7280" }}>Информация отсутствует</p>
            )}
          </div>
          {/* <button
            className={styles.showMoreButton}
            onClick={() => setShowMore((v) => !v)}
          >
            {showMore ? 'Показать меньше' : 'Показать больше'}
          </button> */}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Ближайшие события</h3>
          <div className={styles.eventsList}>
            {/* {profile.upcomingEvents?.map((e) => (
              <div key={e.id} className={styles.eventItem}>
                {getEventIcon(e.date, e.type)}
                <div className={styles.eventDetails}>
                  <div className={styles.eventTitle}>{e.title}</div>
                  <div className={styles.eventMeta}>
                    {e.isOnline ? 'Онлайн' : e.location}
                  </div>
                </div>
              </div>
            ))} */}
            <p style={{ color: "#6b7280", textAlign: "center", padding: "2rem" }}>
              Событий пока нет
            </p>
          </div>
        </div>
      </div>

      <div className={styles.rightColumn}>

        <div className={`${styles.section} ${styles.sectionWithOverlay}`}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Приём пациентов</h3>
            <div className={styles.statusBadge}>Принимает сейчас</div>
          </div>
          <div className={styles.appointmentDetails}>
            <div className={styles.appointmentItem}>
              <div className={styles.appointmentLabel}>
                <DollarSign size={16} />
                Консультация
              </div>
              <div className={styles.appointmentValue}>
                {appointmentData.consultation}
              </div>
            </div>
            <div className={styles.appointmentItem}>
              <div className={styles.appointmentLabel}>
                <Clock size={16} />
                Длительность
              </div>
              <div className={styles.appointmentValue}>
                {appointmentData.duration}
              </div>
            </div>
            <div className={styles.appointmentItem}>
              <div className={styles.appointmentLabel}>
                <Star size={16} />
                Рейтинг
              </div>
              <div className={styles.appointmentValue}>
                {appointmentData.rating} ({appointmentData.reviewsCount} отзывов)
              </div>
            </div>
            <div className={styles.appointmentItem}>
              <div className={styles.appointmentLabel}>
                <UserIcon size={16} />
                Пациентов
              </div>
              <div className={styles.appointmentValue}>
                {appointmentData.patientsCount}
              </div>
            </div>

            <div className={styles.appointmentSlots}>
              {appointmentData.availableSlots.map((slot) => (
                <div key={slot} className={styles.timeSlot}>
                  {slot}
                </div>
              ))}
            </div>
            <button className={styles.selectTimeButton}>
              Записаться на приём
            </button>
            <div className={styles.blurOverlay}>
              <div className={styles.developmentMessage}>В разработке</div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={`${styles.section} ${styles.achievementsSection}`}>
        <div className={styles.achievementsHeader}>
          <h3 className={styles.sectionTitle}>Достижения</h3>
          <button className={styles.addButton}>
            <Plus size={16} />
            Добавить
          </button>
        </div>
        <div className={styles.achievementsList}>
          {profile.achievements?.map((a) => (
            <div key={a.id} className={styles.tooltipWrapper}>
              <div className={styles.achievementItem}>
                {(() => {
                  const Icon = achievementIconMap[a.category] || Award
                  return <Icon size={24} className={styles.achievementIcon} />
                })()}
                <div className={styles.achievementTitle}>{a.title}</div>
                <div className={styles.achievementYear}>
                  {formatYear(a.earnedDate)}
                </div>
                <div className={styles.tooltipText}>{a.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}