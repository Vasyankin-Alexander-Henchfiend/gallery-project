import React, { useEffect } from 'react'
import styles from './modal.module.scss'
import { IconButton } from '../../ui/icon-button/icon-button'
import { ModalOverlay } from './modal-overlay/modal-overlay'
import { ElementStates, IModal } from './modal.types'

export const Modal: React.FC<IModal> = ({
  children,
  onClose,
  state = ElementStates.Closed,
  onShowResultsClick,
  onClearClick,
}) => {
  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', closeByEsc)
    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }
  }, [onClose])

  return (
    <div className={`${styles.modal} ${styles[state]}`}>
      <div className={styles[`modal-content`]}>
        <IconButton
          extraClassButton={styles.button}
          extraClassIcon={styles.icon}
          onClick={onClose}
        />
        <div className={styles[`accordion-container`]}>{children}</div>
        <div className={styles[`buttons-container`]}>
          <button
            onClick={onShowResultsClick}
            className={styles[`text-button`]}
          >
            show the results
          </button>
          <button onClick={onClearClick} className={styles[`text-button`]}>
            clear
          </button>
        </div>
      </div>
      {state === ElementStates.Open && <ModalOverlay onClose={onClose} />}
    </div>
  )
}
export { ElementStates }
