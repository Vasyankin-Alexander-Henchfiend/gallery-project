import React, { ReactNode, useState } from "react";
import cn from 'classnames';
import styles from "../accordion/accordion.module.scss";

interface IAccordionProps {
  title: string;
  children: ReactNode;
}

export const Accordion: React.FC<IAccordionProps> = ({ title, children }) => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <button className={styles.button} onClick={() => setOpen(!open)}>
        <h4 className={styles.title}>{title}</h4>
        <i
          className={cn(styles.icon, open && styles.open)}
        />
      </button>
      {open && <>{children}</>}
    </>
  );
};