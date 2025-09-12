import type React from "react"
import { Calendar, MapPin, Eye } from "lucide-react"
import { locationTypeTranslations, categoryTypeTranslations } from "@/shared/lib/translations"
import type { Conference, Webinar, MasterClass } from "@/entities/announcement/model"
import styles from "./AnnouncementHeader.module.css"

interface AnnouncementHeaderProps {
  announcement: Conference | Webinar | MasterClass
}

export const AnnouncementHeader: React.FC<AnnouncementHeaderProps> = ({ announcement }) => {
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString)
  //   return date.toLocaleDateString("ru-RU", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   })
  // }

  // const getLocationText = () => {
  //   if (!announcement.location) return ""
  //   if (announcement.location.type === "online") return "Онлайн"
  //   if (announcement.location.type === "hybrid") return "Гибридный формат"
  //   return announcement.location.city || "Офлайн"
  // }

  return (
    <div className={styles.header}>
      <div className={styles.badges}>
        <span className={styles.typeBadge}>
          {categoryTypeTranslations[announcement.type as keyof typeof categoryTypeTranslations] ||
                announcement.type}
        </span>
        {announcement.isPromoted && <span className={styles.promotedBadge}>Рекомендуемое</span>}
      </div>

      <h1 className={styles.title}>{announcement.title}</h1>

      <div className={styles.organizer}>
        Организатор: <span className={styles.organizerName}>{announcement.organizer}</span>
      </div>

      {/*<div className={styles.meta}>
        <div className={styles.metaItem}>
          <Calendar size={18} className={styles.icon} />
          <span>{formatDate(announcement.activeFrom)}</span>
          {announcement.activeTo && <span> - {formatDate(announcement.activeTo)}</span>}
        </div>

        {announcement.location && (
          <div className={styles.metaItem}>
            <MapPin size={18} className={styles.icon} />
            <span>{getLocationText()}</span>
          </div>
        )}

         <div className={styles.metaItem}>
          <Eye size={18} className={styles.icon} />
          <span>{announcement.viewsCount} просмотров</span>
        </div> 
      </div>*/}
    </div>
  )
}
