import { useState } from "react";
import styles from "./datalist.module.scss";
import { ModalOverlay } from "../../components/modal/modal-overlay/modal-overlay";

type TInputWithDataList = {
  placeholder: string;
  type: string;
  data: {
    id: string | number;
    label: string | number;
  }[] | undefined;
};

export const InputWithDataList = (props: TInputWithDataList) => {

const {
  placeholder,
  type,
  data = null,
  ...rest
} = props;

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
        {data?.map((item) => (
          <li key={item.id} onClick={() => setInputValue(item.label.toString())}>
            {item.label}
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
