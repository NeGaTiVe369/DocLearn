"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Eye, Edit, Ban, Users, CheckCircle } from "lucide-react"
import styles from "./AdminUsers.module.css"

const mockUsers = [
  {
    id: "1",
    firstName: "Анна",
    lastName: "Петрова",
    email: "anna.petrova@example.com",
    avatar: "/Avatars/Avatar1.webp",
    defaultAvatarPath: "/Avatars/Avatar1.webp",
    role: "doctor" as const,
    status: "active" as const,
    isVerified: { doctor: true, user: true, student: false },
    createdAt: "2024-01-15",
    lastActive: "2024-01-20",
  },
  {
    id: "2",
    firstName: "Михаил",
    lastName: "Иванов",
    email: "mikhail.ivanov@example.com",
    avatar: "/Avatars/Avatar2.webp",
    defaultAvatarPath: "/Avatars/Avatar2.webp",
    role: "student" as const,
    status: "active" as const,
    isVerified: { doctor: false, user: true, student: true },
    createdAt: "2024-01-10",
    lastActive: "2024-01-19",
  },
  {
    id: "3",
    firstName: "Елена",
    lastName: "Сидорова",
    email: "elena.sidorova@example.com",
    avatar: "/Avatars/Avatar3.webp",
    defaultAvatarPath: "/Avatars/Avatar3.webp",
    role: "doctor" as const,
    status: "blocked" as const,
    isVerified: { doctor: true, user: true, student: false },
    createdAt: "2024-01-05",
    lastActive: "2024-01-18",
  },
  {
    id: "4",
    firstName: "Дмитрий",
    lastName: "Козлов",
    email: "dmitry.kozlov@example.com",
    avatar: "/Avatars/Avatar4.webp",
    defaultAvatarPath: "/Avatars/Avatar4.webp",
    role: "resident" as const,
    status: "active" as const,
    isVerified: { doctor: false, user: false, student: false, resident: true },
    createdAt: "2024-01-12",
    lastActive: "2024-01-21",
  },
  {
    id: "5",
    firstName: "Ольга",
    lastName: "Морозова",
    email: "olga.morozova@example.com",
    avatar: "/Avatars/Avatar5.webp",
    defaultAvatarPath: "/Avatars/Avatar5.webp",
    role: "admin" as const,
    status: "active" as const,
    isVerified: { doctor: false, user: true, student: false },
    createdAt: "2023-12-20",
    lastActive: "2024-01-21",
  },
  {
    id: "6",
    firstName: "Александр",
    lastName: "Петров",
    email: "alexander.petrov@example.com",
    avatar: "/Avatars/Avatar1.webp",
    defaultAvatarPath: "/Avatars/Avatar1.webp",
    role: "postgraduate" as const,
    status: "active" as const,
    isVerified: { doctor: false, user: true, student: false, postgraduate: true },
    createdAt: "2024-01-08",
    lastActive: "2024-01-20",
  },
  {
    id: "7",
    firstName: "Мария",
    lastName: "Исследователь",
    email: "maria.researcher@example.com",
    avatar: "/Avatars/Avatar2.webp",
    defaultAvatarPath: "/Avatars/Avatar2.webp",
    role: "researcher" as const,
    status: "active" as const,
    isVerified: { doctor: false, user: true, student: false, researcher: true },
    createdAt: "2024-01-03",
    lastActive: "2024-01-19",
  },
  {
    id: "8",
    firstName: "Владимир",
    lastName: "Владелец",
    email: "vladimir.owner@example.com",
    avatar: "/Avatars/Avatar3.webp",
    defaultAvatarPath: "/Avatars/Avatar3.webp",
    role: "owner" as const,
    status: "active" as const,
    isVerified: { doctor: false, user: true, student: false },
    createdAt: "2023-11-15",
    lastActive: "2024-01-21",
  },
]

type UserRole = "all" | "student" | "resident" | "postgraduate" | "doctor" | "researcher" | "admin" | "owner"
type UserStatus = "all" | "active" | "blocked"

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRole>("all")
  const [statusFilter, setStatusFilter] = useState<UserStatus>("all")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "student":
        return styles.roleStudent
      case "resident":
        return styles.roleStudent // используем тот же стиль что и для студента
      case "postgraduate":
        return styles.roleDoctor // используем стиль врача для аспиранта
      case "doctor":
        return styles.roleDoctor
      case "researcher":
        return styles.roleDoctor // используем стиль врача для исследователя
      case "admin":
        return styles.roleAdmin
      case "owner":
        return styles.roleAdmin // используем тот же стиль что и для админа
      default:
        return styles.roleStudent
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return styles.statusActive
      case "blocked":
        return styles.statusBlocked
      default:
        return styles.statusActive
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student":
        return "Студент"
      case "resident":
        return "Ординатор"
      case "postgraduate":
        return "Аспирант"
      case "doctor":
        return "Врач"
      case "researcher":
        return "Научный сотрудник"
      case "admin":
        return "Админ"
      case "owner":
        return "Владелец"
      default:
        return role
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Активен"
      case "blocked":
        return "Заблокирован"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU")
  }

  const handleViewUser = (_userId: string) => {}
  const handleEditUser = (_userId: string) => {}
  const handleBlockUser = (_userId: string) => {}

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Управление пользователями</h1>
          <p className={styles.subtitle}>Просмотр и управление пользователями системы</p>
        </div>
      </div>

      <div className={styles.controls}>
        <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#6b7280",
            }}
          />
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole)}
          className={styles.filterSelect}
        >
          <option value="all">Все роли</option>
          <option value="student">Студенты</option>
          <option value="resident">Ординаторы</option>
          <option value="postgraduate">Аспиранты</option>
          <option value="doctor">Врачи</option>
          <option value="researcher">Научные сотрудники</option>
          <option value="admin">Администраторы</option>
          <option value="owner">Владельцы</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as UserStatus)}
          className={styles.filterSelect}
        >
          <option value="all">Все статусы</option>
          <option value="active">Активные</option>
          <option value="blocked">Заблокированные</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <div className={styles.placeholder}>
          <Users size={48} className={styles.placeholderIcon} />
          <h3 className={styles.placeholderTitle}>Пользователи не найдены</h3>
          <p className={styles.placeholderText}>Попробуйте изменить параметры поиска или фильтры</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Пользователь</th>
                <th className={styles.tableHeaderCell}>Роль</th>
                <th className={styles.tableHeaderCell}>Статус</th>
                <th className={styles.tableHeaderCell}>Верификация</th>
                <th className={styles.tableHeaderCell}>Дата регистрации</th>
                <th className={styles.tableHeaderCell}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div className={styles.userInfo}>
                      <Image
                        src={user.avatar || user.defaultAvatarPath}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={40}
                        height={40}
                        className={styles.avatar}
                      />
                      <div>
                        <p className={styles.userName}>
                          {user.firstName} {user.lastName}
                        </p>
                        <p className={styles.userEmail}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.roleBadge} ${getRoleBadgeClass(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    {(user.isVerified.doctor ||
                      user.isVerified.user ||
                      user.isVerified.student ||
                      user.isVerified.resident ||
                      user.isVerified.postgraduate ||
                      user.isVerified.researcher) && <CheckCircle size={16} className={styles.verifiedIcon} />}
                  </td>
                  <td className={styles.tableCell}>{formatDate(user.createdAt)}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.actions}>
                      <button
                        onClick={() => handleViewUser(user.id)}
                        className={`${styles.actionButton} ${styles.viewButton}`}
                        title="Просмотреть профиль"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className={`${styles.actionButton} ${styles.editButton}`}
                        title="Редактировать"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleBlockUser(user.id)}
                        className={`${styles.actionButton} ${styles.blockButton}`}
                        title={user.status === "blocked" ? "Разблокировать" : "Заблокировать"}
                      >
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.pagination}>
        <span className={styles.paginationInfo}>
          Показано {filteredUsers.length} из {mockUsers.length} пользователей
        </span>
      </div>
    </div>
  )
}
