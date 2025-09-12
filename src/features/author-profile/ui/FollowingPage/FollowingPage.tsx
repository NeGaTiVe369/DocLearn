"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"
import { useGetFollowingQuery } from "@/features/author-profile/api/authorProfileApi"
import { UserFollowCard } from "@/shared/ui/UserFollowCard/UserFollowCard"
import { Spinner } from "react-bootstrap"
// import styles from "./FollowingPage.module.css"
import styles from "../FollowersPage/FollowersPage.module.css"

interface FollowingPageProps {
  userId: string
}

export const FollowingPage: React.FC<FollowingPageProps> = ({ userId }) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const { data: followingData, isLoading, error } = useGetFollowingQuery(userId)

  const following = followingData?.data || []

  const filteredFollowing = following.filter((user) => {
    const fullName = `${user.lastName} ${user.firstName} ${user.middleName || ""}`.toLowerCase()
    return fullName.includes(searchQuery.toLowerCase())
  })

  const handleBack = () => {
    router.push(`/profile/${userId}`)
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <h1 className={styles.title}>Подписки</h1>
        </div>
        <div className={styles.loading}>
          <Spinner animation="border" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <h1 className={styles.title}>Подписки</h1>
        </div>
        <div className={styles.error}>Ошибка при загрузке подписок</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.title}>Подписки</h1>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.usersList}>
        {filteredFollowing.length === 0 ? (
          <div className={styles.emptyState}>{searchQuery ? "Пользователи не найдены" : "Пока нет подписок"}</div>
        ) : (
          filteredFollowing.map((user) => <UserFollowCard key={user._id} user={user} />)
        )}
      </div>
    </div>
  )
}
