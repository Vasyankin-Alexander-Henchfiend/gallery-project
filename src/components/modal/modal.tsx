import React, { ReactNode, useEffect } from 'react';
import styles from './modal.module.scss';
import { ModalOverlay } from './modal-overlay/modal-overlay';

interface IModal {
    children: ReactNode
    onClose: () => void
}

export const Modal: React.FC<IModal> = ({ children, onClose }) => {
  
  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEsc);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [onClose]);
  
    return (
      <div className={styles.modal}>
        <button onClick={() => onClose()} className={styles[`close-button`]}>
          <i className={styles[`close-icon`]} />
        </button>
        {children}
        <ModalOverlay onClose={onClose} />
      </div>
    );
}