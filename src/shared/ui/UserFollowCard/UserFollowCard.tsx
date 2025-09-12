"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Spinner } from "react-bootstrap"
import type { SpecialistUser, ResearcherUser } from "@/entities/user/model/types"
import { useAppSelector } from "@/shared/hooks/hooks"
import { selectUser, selectIsAuthenticated } from "@/features/auth/model/selectors"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useCheckFollowStatusQuery,
} from "@/features/profile-edit/api/profileEditApi"
import { useAvatarCache } from "@/shared/hooks/useAvatarCache"
import styles from "./UserFollowCard.module.css"

interface UserFollowCardProps {
  user: SpecialistUser
}

export const UserFollowCard: React.FC<UserFollowCardProps> = ({ user }) => {
  const router = useRouter()
  const currentUser = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const { getAvatarUrl } = useAvatarCache()

  const [isProcessing, setIsProcessing] = useState(false)
  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()
  const [unfollowUser, { isLoading: isUnfollowLoading }] = useUnfollowUserMutation()

  const isOwnProfile = currentUser?._id === user._id
  const shouldCheckFollowStatus = isAuthenticated && !isOwnProfile

  const { data: followStatusData, refetch: refetchFollowStatus } = useCheckFollowStatusQuery(user._id, {
    skip: !shouldCheckFollowStatus,
  })

  const isFollowing = followStatusData?.data?.isFollowing || false

  const fullName = `${user.lastName} ${user.firstName} ${user.middleName || ""}`.trim()
  const displayAvatarUrl = getAvatarUrl(user.avatarUrl || user.avatar, user.avatarId, user._id, user.defaultAvatarPath)

  const getSpecializationText = (profile: SpecialistUser): string => {
    switch (profile.role) {
      case "student":
        return "Студент"
      case "resident":
        return "Ординатор"
      case "postgraduate":
        return "Аспирант"
    //   case "doctor":
    //   case "researcher":
    //   case "admin":
    //   case "owner":
    //     const specialistProfile = profile as ResearcherUser
    //     const mainSpecializations = specialistProfile.specializations?.filter((spec) => spec.main)
    //     if (mainSpecializations && mainSpecializations.length > 0) {
    //       return mainSpecializations.map((spec) => spec.name).join(", ")
    //     }
    //     return "Специализация не указана"
      default:
        return "Специализация не указана"
    }
  }

  const handleFollowToggle = async () => {
    if (!isAuthenticated || isOwnProfile) return

    if (isProcessing || isFollowLoading || isUnfollowLoading) return

    setIsProcessing(true)

    try {
      if (isFollowing) {
        await unfollowUser(user._id).unwrap()
      } else {
        await followUser(user._id).unwrap()
      }
      await refetchFollowStatus()
    } catch (error) {
      console.error("Ошибка при изменении подписки:", error)
    } finally {
      setTimeout(() => {
        setIsProcessing(false)
      }, 100)
    }
  }

  const handleUserClick = () => {
    router.push(`/profile/${user._id}`)
  }

  const renderActionButton = () => {
    if (!isAuthenticated || isOwnProfile) return null

    const isButtonLoading = isFollowLoading || isUnfollowLoading || isProcessing

    return (
      <button
        className={isFollowing ? styles.secondaryButton : styles.primaryButton}
        onClick={handleFollowToggle}
        disabled={isButtonLoading}
      >
        {isButtonLoading ? <Spinner animation="border" size="sm" /> : isFollowing ? "Отписаться" : "Подписаться"}
      </button>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.userInfo} onClick={handleUserClick}>
        <div className={styles.avatarContainer}>
            <Image
              src={displayAvatarUrl || "/placeholder.webp"}
              alt={fullName}
              width={50}
              height={50}
              className={styles.avatar}
            />
          {/* {user.avatar || user.avatarUrl ? (
            <Image
              src={displayAvatarUrl || "/placeholder.webp"}
              alt={fullName}
              width={50}
              height={50}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </div>
          )} */}
        </div>
        <div className={styles.userDetails}>
          <h3 className={styles.userName}>{fullName}</h3>
          <p className={styles.userSpecialization}>{getSpecializationText(user)}</p>
        </div>
      </div>
      <div className={styles.actions}>{renderActionButton()}</div>
    </div>
  )
}
