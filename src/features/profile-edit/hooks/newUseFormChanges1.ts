// "use client"

// import { useState, useRef, useCallback, useMemo } from "react"
// import type {
//   SpecialistUser,
//   Contact,
//   Work,
//   Specialization,
//   ScientificStatus,
//   BaseEducation,
//   StudentEducation,
//   GeneralEducation,
//   SpecialistRole,
// } from "@/entities/user/model/newTypes"

// type DeepPartial<T> = {
//   [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
// }

// type SpecialistProfileChanges = DeepPartial<SpecialistUser> & {
//   specializations?: Specialization[]
//   scientificStatus?: ScientificStatus
// }

// // Утилиты для сравнения массивов
// const areContactsEqual = (contacts1: Contact[], contacts2: Contact[]): boolean => {
//   if (contacts1.length !== contacts2.length) return false
//   return contacts1.every((contact1, index) => {
//     const contact2 = contacts2[index]
//     return (
//       contact1.type === contact2.type &&
//       contact1.label === contact2.label &&
//       contact1.value === contact2.value &&
//       Boolean(contact1.isPublic) === Boolean(contact2.isPublic)
//     )
//   })
// }

// const areWorkHistoryEqual = (work1: Work[], work2: Work[]): boolean => {
//   if (work1.length !== work2.length) return false
//   return work1.every((w1, index) => {
//     const w2 = work2[index]
//     return (
//       w1.organizationName === w2.organizationName &&
//       w1.position === w2.position &&
//       w1.startDate === w2.startDate &&
//       w1.endDate === w2.endDate &&
//       Boolean(w1.isCurrently) === Boolean(w2.isCurrently)
//     )
//   })
// }

// const areSpecializationsEqual = (spec1: Specialization[], spec2: Specialization[]): boolean => {
//   if (spec1.length !== spec2.length) return false
//   return spec1.every((s1, index) => {
//     const s2 = spec2[index]
//     return s1.name === s2.name && s1.method === s2.method && s1.qualificationCategory === s2.qualificationCategory
//   })
// }

// const areEducationEqual = (edu1: BaseEducation[], edu2: BaseEducation[]): boolean => {
//   if (edu1.length !== edu2.length) return false
//   return edu1.every((e1, index) => {
//     const e2 = edu2[index]
//     return (
//       e1.institution === e2.institution &&
//       e1.specialty === e2.specialty &&
//       e1.startDate === e2.startDate &&
//       e1.graduationYear === e2.graduationYear &&
//       Boolean(e1.isCurrently) === Boolean(e2.isCurrently) &&
//       ("degree" in e1 && "degree" in e2 ? e1.degree === e2.degree : true)
//     )
//   })
// }

// const isScientificStatusEqual = (status1: ScientificStatus, status2: ScientificStatus): boolean => {
//   return (
//     status1.degree === status2.degree &&
//     status1.title === status2.title &&
//     status1.rank === status2.rank &&
//     JSON.stringify(status1.interests.sort()) === JSON.stringify(status2.interests.sort())
//   )
// }

// // Валидация
// const isValidContact = (contact: Contact): boolean => {
//   return Boolean(contact.value && contact.value.trim() !== "")
// }

// const isValidWork = (work: Work): boolean => {
//   return Boolean(
//     work.organizationName.trim() && work.position.trim() && work.startDate && (work.isCurrently || work.endDate),
//   )
// }

// const isValidSpecialization = (spec: Specialization): boolean => {
//   return Boolean(spec.name.trim())
// }

// const isValidEducation = (edu: BaseEducation): boolean => {
//   return Boolean(
//     edu.institution.trim() && edu.specialty.trim() && edu.startDate && (edu.isCurrently || edu.graduationYear),
//   )
// }

// export const useNewFormChanges = (initialData: SpecialistUser) => {
//   const [formData, setFormData] = useState<SpecialistUser & { uploadedAvatarFile?: File | null }>(() => ({
//     ...initialData,
//     contacts: initialData.contacts || [],
//     workHistory: initialData.workHistory || [],
//     bio: initialData.bio || "",
//     uploadedAvatarFile: null,
//   }))

//   // Временное хранение данных при смене роли
//   const [roleDataStorage, setRoleDataStorage] = useState<Record<SpecialistRole, Partial<SpecialistUser>>>({
//     student: {},
//     resident: {},
//     postgraduate: {},
//     doctor: {},
//     researcher: {},
//     admin: {},
//   })

//   const originalData = useRef<SpecialistUser>(initialData)

//   const updateOriginalData = useCallback((newData: SpecialistUser) => {
//     originalData.current = newData
//     setFormData({
//       ...newData,
//       contacts: newData.contacts || [],
//       workHistory: newData.workHistory || [],
//       bio: newData.bio || "",
//       uploadedAvatarFile: null,
//     })
//   }, [])

//   const updateField = useCallback((field: keyof SpecialistUser, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }, [])

//   // Обработка смены роли с сохранением данных
//   const handleRoleChange = useCallback(
//     (newRole: SpecialistRole) => {
//       const currentRole = formData.role

//       // Сохраняем текущие данные для текущей роли
//       const currentRoleData: Partial<SpecialistUser> = {}

//       // Сохраняем специфичные для роли поля
//       if (currentRole === "doctor" || currentRole === "researcher") {
//         if ("specializations" in formData && formData.specializations) {
//           currentRoleData.specializations = formData.specializations
//         }
//       }

//       if (currentRole === "postgraduate" || currentRole === "doctor" || currentRole === "researcher") {
//         if ("scientificStatus" in formData && formData.scientificStatus) {
//           currentRoleData.scientificStatus = formData.scientificStatus
//         }
//       }

//       if (currentRole !== "student" && "education" in formData) {
//         currentRoleData.education = formData.education as GeneralEducation[]
//       }

//       // Обновляем хранилище
//       setRoleDataStorage((prev) => ({
//         ...prev,
//         [currentRole]: currentRoleData,
//       }))

//       // Создаем новые данные формы с базовыми полями
//       const baseData = {
//         ...formData,
//         role: newRole,
//       }

//       // Восстанавливаем сохраненные данные для новой роли
//       const savedData = roleDataStorage[newRole]
//       const newFormData = { ...baseData, ...savedData }

//       // Инициализируем специфичные поля для новой роли
//       if (newRole === "student") {
//         if (!("education" in newFormData) || !newFormData.education) {
//           ;(newFormData as any).education = {
//             id: `temp_${Date.now()}`,
//             institution: "",
//             specialty: "",
//             startDate: "",
//             graduationYear: "",
//             isCurrently: false,
//             degree: "Специалитет",
//           } as StudentEducation
//         }
//       } else {
//         if (!("education" in newFormData) || !Array.isArray(newFormData.education)) {
//           ;(newFormData as any).education = []
//         }
//       }

//       if (
//         (newRole === "postgraduate" || newRole === "doctor" || newRole === "researcher") &&
//         !("scientificStatus" in newFormData)
//       ) {
//         ;(newFormData as any).scientificStatus = {
//           degree: null,
//           title: null,
//           rank: null,
//           interests: [],
//         }
//       }

//       if ((newRole === "doctor" || newRole === "researcher") && !("specializations" in newFormData)) {
//         ;(newFormData as any).specializations = []
//       }

//       setFormData(newFormData as SpecialistUser & { uploadedAvatarFile?: File | null })
//     },
//     [formData, roleDataStorage],
//   )

//   const getChangedFields = useCallback((): SpecialistProfileChanges => {
//     const changes: SpecialistProfileChanges = {}
//     const original = originalData.current

//     // Базовые поля, общие для всех ролей
//     const baseFields: (keyof SpecialistUser)[] = [
//       "firstName",
//       "lastName",
//       "middleName",
//       "bio",
//       "placeStudy",
//       "placeWork",
//       "mainSpecialization",
//       "location",
//       "avatar",
//       "defaultAvatarPath",
//       "experience",
//       "role",
//     ]

//     baseFields.forEach((field) => {
//       const originalValue = original[field] || ""
//       const currentValue = formData[field] || ""

//       if (originalValue !== currentValue) {
//         ;(changes as any)[field] = currentValue
//       }
//     })

//     // Дата рождения
//     const originalBirthday = original.birthday?.split("T")[0] || ""
//     const currentBirthday = formData.birthday?.split("T")[0] || ""
//     if (originalBirthday !== currentBirthday) {
//       changes.birthday = currentBirthday
//     }

//     // Контакты
//     const originalContacts = original.contacts || []
//     const currentContacts = formData.contacts || []
//     if (!areContactsEqual(originalContacts, currentContacts)) {
//       changes.contacts = currentContacts
//     }

//     // История работы
//     const originalWorkHistory = original.workHistory || []
//     const currentWorkHistory = formData.workHistory || []
//     if (!areWorkHistoryEqual(originalWorkHistory, currentWorkHistory)) {
//       changes.workHistory = currentWorkHistory
//     }

//     // Образование
//     if ("education" in original && "education" in formData) {
//       if (!areEducationEqual(original.education as BaseEducation[], formData.education as BaseEducation[])) {
//         changes.education = formData.education as BaseEducation[]
//       }
//     }

//     // Специализации (для врачей и исследователей)
//     if (
//       "specializations" in original &&
//       "specializations" in formData &&
//       original.specializations &&
//       formData.specializations
//     ) {
//       if (!areSpecializationsEqual(original.specializations, formData.specializations)) {
//         ;(changes as any).specializations = formData.specializations
//       }
//     }

//     // Научный статус (для аспирантов, врачей и исследователей)
//     if (
//       "scientificStatus" in original &&
//       "scientificStatus" in formData &&
//       original.scientificStatus &&
//       formData.scientificStatus
//     ) {
//       if (!isScientificStatusEqual(original.scientificStatus, formData.scientificStatus)) {
//         ;(changes as any).scientificStatus = formData.scientificStatus
//       }
//     }

//     return changes
//   }, [formData])

//   const hasChanges = useMemo(() => {
//     const profileChanges = Object.keys(getChangedFields()).length > 0
//     const hasUploadedFile = Boolean(formData.uploadedAvatarFile)
//     return profileChanges || hasUploadedFile
//   }, [getChangedFields, formData.uploadedAvatarFile])

//   const resetToOriginal = useCallback(() => {
//     setFormData({
//       ...originalData.current,
//       contacts: originalData.current.contacts || [],
//       workHistory: originalData.current.workHistory || [],
//       bio: originalData.current.bio || "",
//       uploadedAvatarFile: null,
//     })
//     // Очищаем временное хранилище
//     setRoleDataStorage({
//       student: {},
//       resident: {},
//       postgraduate: {},
//       doctor: {},
//       researcher: {},
//       admin: {},
//     })
//   }, [])

//   const getDataToSend = useCallback(() => {
//     const changedFields = getChangedFields()
//     const cleanedData: Record<string, any> = {}

//     Object.entries(changedFields).forEach(([key, value]) => {
//       if (key === "contacts" && Array.isArray(value)) {
//         const validContacts = (value as Contact[]).filter(isValidContact).map(({ _id, ...rest }) => rest)
//         if (validContacts.length > 0) {
//           cleanedData[key] = validContacts
//         }
//       } else if (key === "workHistory" && Array.isArray(value)) {
//         const validWork = (value as Work[]).filter(isValidWork).map(({ id, ...rest }) => {
//           if (rest.isCurrently) {
//             const { endDate, ...workWithoutEndDate } = rest
//             return workWithoutEndDate
//           }
//           return rest
//         })
//         if (validWork.length > 0) {
//           cleanedData[key] = validWork
//         }
//       } else if (key === "specializations" && Array.isArray(value)) {
//         const validSpecializations = (value as Specialization[])
//           .filter(isValidSpecialization)
//           .map(({ id, ...rest }) => rest)
//         if (validSpecializations.length > 0) {
//           cleanedData[key] = validSpecializations
//         }
//       } else if (key === "education" && Array.isArray(value)) {
//         const validEducation = (value as BaseEducation[]).filter(isValidEducation).map(({ id, ...rest }) => {
//           if (rest.isCurrently) {
//             const { graduationYear, ...educationWithoutGraduationYear } = rest
//             return educationWithoutGraduationYear
//           }
//           return rest
//         })
//         if (validEducation.length > 0) {
//           cleanedData[key] = validEducation
//         }
//       } else if (Array.isArray(value)) {
//         if (value.length > 0) {
//           cleanedData[key] = value
//         }
//       } else if (value !== "" && value !== null && value !== undefined) {
//         cleanedData[key] = value
//       }
//     })

//     return cleanedData
//   }, [getChangedFields])

//   const setUploadedAvatarFile = useCallback((file: File | null) => {
//     setFormData((prev) => ({ ...prev, uploadedAvatarFile: file }))
//   }, [])

//   const clearUploadedAvatarFile = useCallback(() => {
//     setFormData((prev) => ({ ...prev, uploadedAvatarFile: null }))
//   }, [])

//   return {
//     formData,
//     updateField,
//     handleRoleChange,
//     getChangedFields,
//     getDataToSend,
//     hasChanges,
//     resetToOriginal,
//     updateOriginalData,
//     setUploadedAvatarFile,
//     clearUploadedAvatarFile,
//   }
// }
