"use client"

import { LogOut, Settings, FileText, Bookmark, User, Sun, BellRing } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { UserProfile, MenuItem } from "../../model/types"
import styles from "./UserProfileCard.module.css"

interface UserProfileCardProps extends Partial<UserProfile> {
  userId?: string
  onLogout?: () => void
  onClose?: () => void
  defaultAvatarPath: string
}

export function UserProfileCard({
  name,
  role,
  avatar,
  defaultAvatarPath,
  userId,
  onLogout,
  onClose,
}: UserProfileCardProps) {
  const router = useRouter()

  const handleProfileClick = () => {
    router.push(`/profile/${userId}`)
    onClose?.()
  }

  const handleSettingsClick = () => {
    router.push(`/profile/${userId}/edit`)
    onClose?.()
  }

  const menuItems: MenuItem[] = [
    {
      label: "Уведомления",
      href: "#",
      icon: <BellRing className={styles.icon} />,
    },
    {
      label: "Сохраненное",
      href: "#",
      icon: <Bookmark className={styles.icon} />,
    },
    {
      label: "Обновления",
      href: "#",
      icon: <FileText className={styles.icon} />,
    },
    {
      label: "Тема оформления",
      href: "#",
      icon: <Sun className={styles.icon} />,
      value: "Светлая",
    },
  ]

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    onClose?.()
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <Image
                src={avatar || defaultAvatarPath}
                alt={name || "Аватарка"}
                width={64}
                height={64}
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{name}</h2>
              <p className={styles.profileRole}>{role}</p>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.menuContainer}>
            <button onClick={handleProfileClick} className={`${styles.menuItem} ${styles.logoutButton}`} type="button">
              <div className={styles.menuItemLeft}>
                <User className={styles.icon} />
                <span className={styles.menuItemLabel}>Мой профиль</span>
              </div>
            </button>

            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} className={styles.menuItem}>
                <div className={styles.menuItemLeft}>
                  {item.icon}
                  <span className={styles.menuItemLabel}>{item.label}</span>
                </div>
                <div className={styles.menuItemRight}>
                  {item.value && <span className={styles.menuItemValue}>{item.value}</span>}
                </div>
              </Link>
            ))}

            <button onClick={handleSettingsClick} className={`${styles.menuItem} ${styles.logoutButton}`} type="button">
              <div className={styles.menuItemLeft}>
                <Settings className={styles.icon} />
                <span className={styles.menuItemLabel}>Настройки</span>
              </div>
            </button>
            
            <button type="button" className={`${styles.menuItem} ${styles.logoutButton}`} onClick={handleLogout}>
              <div className={styles.menuItemLeft}>
                <LogOut className={styles.icon} />
                <span className={styles.menuItemLabel}>Выйти</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
