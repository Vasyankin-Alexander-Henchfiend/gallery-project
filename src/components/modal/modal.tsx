import React, { ReactNode, useEffect } from "react";
import styles from "./modal.module.scss";
import { Button } from "../../ui/button/button";
import { ElementStates } from "../types/types";
import { ModalOverlay } from "./modal-overlay/modal-overlay";

interface IModal {
  children: ReactNode;
  onClose: () => void;
  state: ElementStates;
}

export const Modal: React.FC<IModal> = ({
  children,
  onClose,
  state = ElementStates.Closed,
}) => {
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
    <div className={`${styles.modal} ${styles[state]}`}>
      <div className={styles[`modal-content`]}>
        <Button
          extraClassButton={styles.button}
          extraClassIcon={styles.icon}
          onClick={onClose}
        />
        <div className={styles[`accordion-container`]}>{children}</div>
        <div className={styles[`buttons-container`]}>
          <button className={styles[`text-button`]}>show the results</button>
          <button className={styles[`text-button`]}>clear</button>
        </div>
      </div>
      {state === ElementStates.Open && <ModalOverlay onClose={onClose} />}
    </div>
  );
};
export { ElementStates };
