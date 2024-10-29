import React from "react";
import styles from "../accordion/accordion.module.css";

interface IAccordionProps {
  title: string;
  type: string;
  placeholder: string;
  itemArray: string[]
}

export const Accordion: React.FC<IAccordionProps> = ({ title, type, placeholder, itemArray }) => {
  return (
    <div>
      <div>
        <span className={styles.title}>{title}</span>
        <button className={styles.button}>
          <div className={styles[`button-image`]}></div>
        </button>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={styles.input}
        list="list"
      />
      <datalist id="list">
        {itemArray.map((item, index) => <option key={index} value={item}>{item}</option>)}
      </datalist>
    </div>
  );
};