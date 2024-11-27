import { useState } from "react";
import styles from "./datalist.module.scss";
import { ModalOverlay } from "../../components/modal/modal-overlay/modal-overlay";

interface IInputWithDataList {
  placeholder: string;
  type: string;
  data: (string | number)[] | undefined;
}

export const InputWithDataList: React.FC<IInputWithDataList> = ({
  placeholder,
  type,
  data,
  ...rest
}) => {
  enum ListState {
    Hidden = "hidden",
    Visible = "visible",
  }

  const [listState, setListState] = useState(ListState.Hidden);
  const [inputValue, setInputValue] = useState<string>("");

  const listSeter = () => {
    if (listState === ListState.Hidden) {
      setListState(ListState.Visible);
    } else setListState(ListState.Hidden);
  };

  return (
    <div id="datalist" className={`${styles.datalist} ${styles[listState]}`}>
      <input
        onClick={() => setListState(ListState.Visible)}
        className={styles[`datalist-input`]}
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        {...rest}
      />
      <i className={styles.icon} onClick={() => listSeter()} />
      <ul className={styles.list}>
        {data?.map((item, index) => (
          <li key={index} onClick={() => setInputValue(item.toString())}>
            {item}
          </li>
        ))}
      </ul>
      {listState === ListState.Visible && (
        <ModalOverlay
          extraClass={styles.overlay}
          onClose={() => setListState(ListState.Hidden)}
        />
      )}
    </div>
  );
};
