import React, { useState } from "react";
import styles from "../accordion/accordion.module.scss";

interface IAccordionProps {
  title: string;
  type: string;
  placeholder: string;
  itemArray: string[]
}

export const Accordion: React.FC<IAccordionProps> = ({ title, type, placeholder, itemArray }) => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <button className={styles.button} onClick={() => setOpen(!open)}>
        <h4 className={styles.title}>{title}</h4>
        <i
          className={
            !open ? styles.icon : `${styles.icon} ${styles[`icon-open`]}`
          }
        />
      </button>
      {open ? (
        <fieldset className={styles.fieldset}>
          <input
            type={type}
            placeholder={placeholder}
            className={styles.input}
            list="list"
          />
          <datalist id="list" role="listbox" className={styles.datalist}>
            {itemArray.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </datalist>
        </fieldset>
      ) : null}
    </>
  );
};