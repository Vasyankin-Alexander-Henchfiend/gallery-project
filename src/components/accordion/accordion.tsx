import React, { useState } from "react";
import cn from 'classnames';
import styles from "../accordion/accordion.module.scss";
import { InputWithDataList } from "../../ui/datalist/datalist";

interface IAccordionProps {
  title: string;
  type: string;
  placeholder: string;
  itemArray: (string | number)[] | undefined
}

export const Accordion: React.FC<IAccordionProps> = ({ title, type, placeholder, itemArray }) => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <button className={styles.button} onClick={() => setOpen(!open)}>
        <h4 className={styles.title}>{title}</h4>
        <i
          className={cn(styles.icon, open && styles.open)}
        />
      </button>
      {open && (
        <InputWithDataList
          placeholder={placeholder}
          type={type}
          data={itemArray}
        />
      )}
    </>
  );
};