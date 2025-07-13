"use client"

import type React from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { Plus, Trash2, GraduationCap } from "lucide-react"
import type { Education, AuthorProfile } from "@/entities/user/model/types"
import styles from "./FormBlock.module.css"

interface EducationBlockProps {
  education: Education[]
  onChange: (field: keyof AuthorProfile, value: any) => void
}

export const EducationBlock: React.FC<EducationBlockProps> = ({ education = [], onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: `temp_${Date.now()}`,
      institution: "",
      degree: "",
      specialty: "",
      startDate: "",
      graduationYear: "",
      isCurrently: false,
    }
    onChange("education", [...education, newEducation])
  }

  const removeEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index)
    onChange("education", newEducation)
  }

  const updateEducation = (index: number, field: keyof Education, value: string | boolean) => {
    const newEducation = [...education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    onChange("education", newEducation)
  }

  const validateDates = (startDate: string, graduationYear: string, isCurrently: boolean) => {
    if (!startDate) return "Дата начала обязательна"

    const start = new Date(startDate).getFullYear()
    const currentYear = new Date().getFullYear()

    if (start > currentYear) {
      return "Дата начала не может быть в будущем"
    }

    if (!isCurrently && graduationYear) {
      const graduation = Number.parseInt(graduationYear)
      if (graduation < start) {
        return "Год окончания не может быть раньше года начала"
      }
      if (graduation > currentYear) {
        return "Год окончания не может быть в будущем"
      }
    }

    return ""
  }

  return (
    <div className={styles.block}>
      <div className={styles.blockHeader}>
        <h3 className={styles.blockTitle}>Образование</h3>
        <Button variant="outline-primary" size="sm" onClick={addEducation}>
          <Plus size={16} />
          Добавить образование
        </Button>
      </div>

      <Alert variant="info" className={styles.moderationAlert}>
        <small>
          Информация об образовании проходит модерацию. До завершения проверки будут отображаться старые значения.
        </small>
      </Alert>

      {education.length === 0 && (
        <Alert variant="light" className={styles.emptyState}>
          Образование не добавлено. Нажмите "Добавить образование" чтобы начать.
        </Alert>
      )}

      <div className={styles.educationList}>
        {education.map((edu, index) => {
          const dateError = validateDates(edu.startDate, edu.graduationYear, edu.isCurrently)

          return (
            <div key={edu.id || index} className={styles.educationItem}>
              <div className={styles.educationHeader}>
                <GraduationCap size={16} className={styles.educationIcon} />
                <span className={styles.educationNumber}>Образование {index + 1}</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className={styles.removeButton}
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              <div className={styles.educationFields}>
                <Form.Group>
                  <Form.Label className={styles.label}>Учебное заведение *</Form.Label>
                  <Form.Control
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    className={styles.input}
                    placeholder="Название университета, института, колледжа"
                  />
                </Form.Group>

                <div className={styles.formRow}>
                  <Form.Group>
                    <Form.Label className={styles.label}>Степень/Квалификация</Form.Label>
                    <Form.Control
                      type="text"
                      value={edu.degree || ""}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      className={styles.input}
                      placeholder="Бакалавр, Магистр, Специалист"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className={styles.label}>Специальность</Form.Label>
                    <Form.Control
                      type="text"
                      value={edu.specialty || ""}
                      onChange={(e) => updateEducation(index, "specialty", e.target.value)}
                      className={styles.input}
                      placeholder="Направление подготовки"
                    />
                  </Form.Group>
                </div>

                <div className={styles.formRow}>
                  <Form.Group>
                    <Form.Label className={styles.label}>Дата начала *</Form.Label>
                    <Form.Control
                      type="date"
                      value={edu.startDate ? edu.startDate.split("T")[0] : ""}
                      onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                      className={`${styles.input} ${dateError ? styles.inputError : ""}`}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className={styles.label}>
                      {edu.isCurrently ? "Год окончания (ожидаемый)" : "Год окончания"}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min="1950"
                      max="2030"
                      value={edu.graduationYear || ""}
                      onChange={(e) => updateEducation(index, "graduationYear", e.target.value)}
                      className={`${styles.input} ${dateError ? styles.inputError : ""}`}
                      placeholder="2024"
                      disabled={edu.isCurrently}
                    />
                  </Form.Group>
                </div>

                <Form.Check
                  type="checkbox"
                  label="Обучаюсь в настоящее время"
                  checked={edu.isCurrently}
                  onChange={(e) => {
                    updateEducation(index, "isCurrently", e.target.checked)
                    if (e.target.checked) {
                      updateEducation(index, "graduationYear", "")
                    }
                  }}
                  className={styles.checkbox}
                />

                {dateError && <div className={styles.errorText}>{dateError}</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}



// "use client"

// import type React from "react"
// import { Form, Button, Alert } from "react-bootstrap"
// import { Plus, Trash2, Mail, Phone, Globe, MessageCircle } from "lucide-react"
// import type { Contact, AuthorProfile } from "@/entities/user/model/types"
// import styles from "./FormBlock.module.css"

// interface ContactsBlockProps {
//   contacts: Contact[]
//   onChange: (field: keyof AuthorProfile, value: any) => void
// }

// const contactTypes = [
//   { value: "email", label: "Email", icon: Mail },
//   { value: "phone", label: "Телефон", icon: Phone },
//   { value: "website", label: "Веб-сайт", icon: Globe },
//   { value: "telegram", label: "Telegram", icon: MessageCircle },
//   { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
//   { value: "vk", label: "VKontakte", icon: MessageCircle },
//   { value: "facebook", label: "Facebook", icon: MessageCircle },
//   { value: "twitter", label: "Twitter", icon: MessageCircle },
//   { value: "instagram", label: "Instagram", icon: MessageCircle },
// ]

// export const ContactsBlock: React.FC<ContactsBlockProps> = ({ contacts = [], onChange }) => {
//   const addContact = () => {
//     const newContact: Contact = {
//       type: "email",
//       value: "",
//       label: "",
//     }
//     onChange("contacts", [...contacts, newContact])
//   }

//   const removeContact = (index: number) => {
//     const newContacts = contacts.filter((_, i) => i !== index)
//     onChange("contacts", newContacts)
//   }

//   const updateContact = (index: number, field: keyof Contact, value: string) => {
//     const newContacts = [...contacts]
//     newContacts[index] = { ...newContacts[index], [field]: value }
//     onChange("contacts", newContacts)
//   }

//   const formatPhoneNumber = (value: string) => {
//     const cleaned = value.replace(/\D/g, "")
//     if (cleaned.length <= 11) {
//       return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")
//     }
//     return value
//   }

//   const validateContact = (contact: Contact) => {
//     if (!contact.value.trim()) return "Значение обязательно"

//     switch (contact.type) {
//       case "email":
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//         return emailRegex.test(contact.value) ? "" : "Некорректный email"
//       case "phone":
//         const phoneRegex = /^\+?[\d\s\-()]{10,}$/
//         return phoneRegex.test(contact.value) ? "" : "Некорректный номер телефона"
//       case "website":
//         try {
//           new URL(contact.value.startsWith("http") ? contact.value : `https://${contact.value}`)
//           return ""
//         } catch {
//           return "Некорректный URL"
//         }
//       default:
//         return ""
//     }
//   }

//   return (
//     <div className={styles.block}>
//       <div className={styles.blockHeader}>
//         <h3 className={styles.blockTitle}>Контакты</h3>
//         <Button variant="outline-primary" size="sm" onClick={addContact}>
//           <Plus size={16} />
//           Добавить контакт
//         </Button>
//       </div>

//       {contacts.length === 0 && (
//         <Alert variant="light" className={styles.emptyState}>
//           Контакты не добавлены. Нажмите "Добавить контакт" чтобы начать.
//         </Alert>
//       )}

//       <div className={styles.contactsList}>
//         {contacts.map((contact, index) => {
//           const contactType = contactTypes.find((t) => t.value === contact.type)
//           const Icon = contactType?.icon || MessageCircle
//           const error = validateContact(contact)

//           return (
//             <div key={index} className={styles.contactItem}>
//               <div className={styles.contactHeader}>
//                 <Icon size={16} className={styles.contactIcon} />
//                 <Form.Select
//                   value={contact.type}
//                   onChange={(e) => updateContact(index, "type", e.target.value)}
//                   className={styles.contactTypeSelect}
//                 >
//                   {contactTypes.map((type) => (
//                     <option key={type.value} value={type.value}>
//                       {type.label}
//                     </option>
//                   ))}
//                 </Form.Select>
//                 <Button
//                   variant="outline-danger"
//                   size="sm"
//                   onClick={() => removeContact(index)}
//                   className={styles.removeButton}
//                 >
//                   <Trash2 size={14} />
//                 </Button>
//               </div>

//               <div className={styles.contactFields}>
//                 <Form.Group>
//                   <Form.Label className={styles.label}>Значение *</Form.Label>
//                   <Form.Control
//                     type={contact.type === "email" ? "email" : contact.type === "phone" ? "tel" : "text"}
//                     value={contact.value}
//                     onChange={(e) => {
//                       let value = e.target.value
//                       if (contact.type === "phone") {
//                         value = formatPhoneNumber(value)
//                       }
//                       updateContact(index, "value", value)
//                     }}
//                     className={`${styles.input} ${error ? styles.inputError : ""}`}
//                     placeholder={
//                       contact.type === "email"
//                         ? "example@email.com"
//                         : contact.type === "phone"
//                           ? "+7 (999) 123-45-67"
//                           : contact.type === "website"
//                             ? "https://example.com"
//                             : "Введите значение"
//                     }
//                   />
//                   {error && <div className={styles.errorText}>{error}</div>}
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Label className={styles.label}>Подпись (необязательно)</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={contact.label || ""}
//                     onChange={(e) => updateContact(index, "label", e.target.value)}
//                     className={styles.input}
//                     placeholder="Например: Рабочий телефон"
//                   />
//                 </Form.Group>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
