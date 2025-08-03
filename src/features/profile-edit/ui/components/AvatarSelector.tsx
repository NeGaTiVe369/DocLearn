"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { useAvatarCache } from "@/shared/hooks/useAvatarCache"
import type { AvatarFile } from "@/entities/user/model/types"
import styles from "./AvatarSelector.module.css"
import { AvatarUploadModal } from "./AvatarUploadModal"

interface AvatarSelectorProps {
  currentAvatar: string
  defaultAvatarPath: string
  uploadedAvatarFile: File | null
  onAvatarChange: (defaultAvatarPath: string) => void
  onUploadedFileChange: (file: File | null) => void
  userId?: string
  avatarId?: AvatarFile
  avatarUrl?: string
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  currentAvatar,
  defaultAvatarPath,
  uploadedAvatarFile,
  onAvatarChange,
  onUploadedFileChange,
  userId,
  avatarId,
  avatarUrl,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatarPath)
  const [displayAvatar, setDisplayAvatar] = useState<string>("")
  const { getAvatarUrl } = useAvatarCache()

  // Для отслеживания созданных URL для cleanup
  const uploadedFileUrl = useRef<string | null>(null)

  const avatars = Array.from({ length: 22 }, (_, i) => `/Avatars/Avatar${i + 1}.webp`)

  // Мемоизированная функция для получения аватара
  const getDisplayAvatar = useCallback(() => {
    if (uploadedAvatarFile) {
      // Очищаем предыдущий URL если есть
      if (uploadedFileUrl.current) {
        URL.revokeObjectURL(uploadedFileUrl.current)
        uploadedFileUrl.current = null
      }
      // Создаем новый URL для загруженного файла
      uploadedFileUrl.current = URL.createObjectURL(uploadedAvatarFile)
      return uploadedFileUrl.current
    } else {
      const avatarIdString =
        typeof avatarId === "object" && avatarId?._id
          ? avatarId._id
          : typeof avatarId === "string"
            ? avatarId
            : undefined

      return getAvatarUrl(avatarUrl || currentAvatar, avatarIdString, userId, defaultAvatarPath)
    }
  }, [uploadedAvatarFile, avatarUrl, currentAvatar, avatarId, userId, defaultAvatarPath, getAvatarUrl])

  // Обновляем displayAvatar только при изменении зависимостей
  useEffect(() => {
    const newDisplayAvatar = getDisplayAvatar()
    setDisplayAvatar(newDisplayAvatar)
  }, [getDisplayAvatar])

  // Cleanup при размонтировании
  useEffect(() => {
    return () => {
      if (uploadedFileUrl.current) {
        URL.revokeObjectURL(uploadedFileUrl.current)
        uploadedFileUrl.current = null
      }
    }
  }, [])

  const handleSave = () => {
    onAvatarChange(selectedAvatar)
    setShowModal(false)
  }

  const handleCancel = () => {
    setSelectedAvatar(defaultAvatarPath)
    setShowModal(false)
  }

  const handleRandomAvatar = () => {
    const availableAvatars = avatars.filter((avatar) => avatar !== defaultAvatarPath)
    const avatarsToChooseFrom = availableAvatars.length > 0 ? availableAvatars : avatars
    const randomIndex = Math.floor(Math.random() * avatarsToChooseFrom.length)
    const randomAvatar = avatarsToChooseFrom[randomIndex]

    onAvatarChange(randomAvatar)
    onUploadedFileChange(null)
  }

  const handleUploadSuccess = (file: File) => {
    onUploadedFileChange(file)
  }

  const handleUploadError = (error: string) => {
    console.error("Upload error:", error)
  }

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Аватар</h3>
        <div className={styles.currentAvatar} onClick={() => setShowModal(true)}>
          <Image
            src={displayAvatar || "/placeholder.webp"}
            alt="Текущий аватар"
            width={120}
            height={120}
            className={styles.avatarImage}
          />
          {/* <div className={styles.overlay}>
            <span>Изменить</span>
          </div> */}
        </div>

        <button className={styles.addButton} onClick={handleRandomAvatar} type="button">
          Случайная аватарка
        </button>

        <button className={styles.addButton} onClick={() => setShowUploadModal(true)} type="button">
          Загрузить с компьютера
        </button>
      </div>

      <AvatarUploadModal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
      />
    </>
  )
}



// "use client"

// import type React from "react"
// import { useState } from "react"
// import Image from "next/image"
// import styles from "./AvatarSelector.module.css"
// import { Plus } from "lucide-react"
// import { AvatarUploadModal } from "./AvatarUploadModal"

// interface AvatarSelectorProps {
//   currentAvatar: string
//   defaultAvatarPath: string
//   uploadedAvatarFile: File | null
//   onAvatarChange: (defaultAvatarPath: string) => void
//   onUploadedFileChange: (file: File | null) => void
// }

// export const AvatarSelector: React.FC<AvatarSelectorProps> 
// = ({ 
//   currentAvatar, 
//   defaultAvatarPath,
//   uploadedAvatarFile, 
//   onAvatarChange,
//   onUploadedFileChange, 
// }) => {
//   const [showModal, setShowModal] = useState(false)
//   const [showUploadModal, setShowUploadModal] = useState(false)
//   const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatarPath)

//   const avatars = Array.from({ length: 22 }, (_, i) => `/Avatars/Avatar${i + 1}.webp`)

//   const handleSave = () => {
//     onAvatarChange(selectedAvatar)
//     setShowModal(false)
//   }

//   const handleCancel = () => {
//     setSelectedAvatar(defaultAvatarPath)
//     setShowModal(false)
//   }

//   const handleRandomAvatar = () => {
//     const availableAvatars = avatars.filter((avatar) => avatar !== defaultAvatarPath)
//     const avatarsToChooseFrom = availableAvatars.length > 0 ? availableAvatars : avatars
//     const randomIndex = Math.floor(Math.random() * avatarsToChooseFrom.length)
//     const randomAvatar = avatarsToChooseFrom[randomIndex]

//     onAvatarChange(randomAvatar)
//     onUploadedFileChange(null)
//   }

//   const handleUploadSuccess = (file: File) => {
//     onUploadedFileChange(file)
//   }

//   const handleUploadError = (error: string) => {
//     console.error("Upload error:", error)
//   }

//   const displayAvatar = uploadedAvatarFile
//     ? URL.createObjectURL(uploadedAvatarFile)
//     : currentAvatar || defaultAvatarPath

//   return (
//     <>
//       <div className={styles.container}>
//         <h3 className={styles.title}>Аватар</h3>
//         <div className={styles.currentAvatar} onClick={() => setShowModal(true)}>
//           <Image
//             src={displayAvatar || defaultAvatarPath} // src={displayAvatar || "/placeholder.webp"}
//             alt="Текущий аватар"
//             width={120}
//             height={120}
//             className={styles.avatarImage}
//           />
//           <div className={styles.overlay}>
//             <span>Изменить</span>
//           </div>
//         </div>
        
//         <button
//           className={styles.addButton}
//           onClick={handleRandomAvatar}
//           type="button"
//         >
//           {/* <Plus size={16} /> */}
//           Случайная аватарка
//         </button>

//         {/* <button className={styles.addButton} onClick={() => setShowUploadModal(true)} type="button">
//           <Plus size={16} />
//           Загрузить с компьютера
//         </button> */}
//       </div>

//       {/* <Modal show={showModal} onHide={handleCancel} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Выберите аватар</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className={styles.avatarGrid}>
//             {avatars.map((avatar) => (
//               <div
//                 key={avatar}
//                 className={`${styles.avatarOption} ${selectedAvatar === avatar ? styles.selected : ""}`}
//                 onClick={() => setSelectedAvatar(avatar)}
//               >
//                 <Image
//                   src={avatar || "/placeholder.webp"}
//                   alt="Аватар"
//                   width={80}
//                   height={80}
//                   className={styles.optionImage}
//                 />
//               </div>
//             ))}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancel}>
//             Отмена
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Сохранить
//           </Button>
//         </Modal.Footer>
//       </Modal> */}

//       <AvatarUploadModal
//         show={showUploadModal}
//         onHide={() => setShowUploadModal(false)}
//         onUploadSuccess={handleUploadSuccess}
//         onUploadError={handleUploadError}
//       />
//     </>
//   )
// }
