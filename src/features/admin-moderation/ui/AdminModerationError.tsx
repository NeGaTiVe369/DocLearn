"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import styles from "./AdminModeration.module.css"

interface AdminModerationErrorProps {
  error: string
  onRetry: () => void
}

export function AdminModerationError({ error, onRetry }: AdminModerationErrorProps) {
  return (
    <div className={styles.placeholder}>
      <AlertCircle size={48} className={styles.placeholderIcon} />
      <h3 className={styles.placeholderTitle}>Ошибка загрузки</h3>
      <p className={styles.placeholderText}>{error}</p>
      <button
        onClick={onRetry}
        className={`${styles.actionButton} ${styles.approveButton}`}
        style={{ marginTop: "1rem" }}
      >
        <RefreshCw size={16} />
        Повторить попытку
      </button>
    </div>
  )
}
