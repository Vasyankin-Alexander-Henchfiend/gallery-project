import React, { ReactNode, useEffect } from 'react';
import styles from './modal.module.scss';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { Button } from '../../ui/button/button';

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
      <div className={styles[`modal-content`]}>
        <Button extraClassButton={styles.button} extraClassIcon={styles.icon} onClick={onClose}/>
        <div className={styles[`accordion-container`]}>{children}</div>
        <div className={styles[`buttons-container`]}>
          <button className={styles[`text-button`]}>show the results</button>
          <button className={styles[`text-button`]}>clear</button>
        </div>
      </div>
      <ModalOverlay onClose={onClose} />
    </div>
  );
}