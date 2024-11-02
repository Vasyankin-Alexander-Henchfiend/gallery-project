import React, { useState } from "react";
import styles from "../accordion/accordion.module.css";

interface IAccordionProps {
  title: string;
  type: string;
  placeholder: string;
  itemArray: string[]
}

export const Accordion: React.FC<IAccordionProps> = ({ title, type, placeholder, itemArray }) => {

  const [open, setOpen] = useState(false)

  return (
    <div>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <span className={styles.title}>{title}</span>
          <span className={!open ? styles[`icon-plus`] : styles[`icon-minus`]}></span>
        </button>
      {open ? <input
        type={type}
        placeholder={placeholder}
        className={styles.input}
        list="list"
      /> : null}
      <datalist id="list">
        {itemArray.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </datalist>
    </div>
  );
};