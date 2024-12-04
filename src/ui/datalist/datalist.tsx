import { useState } from "react";
import styles from "./datalist.module.scss";
import { ModalOverlay } from "../../components/modal/modal-overlay/modal-overlay";
import { TDataForDatalist } from "../../components/types/types";

interface InputWithDataList extends React.HTMLProps<HTMLInputElement> {
  placeholder: string;
  getItem: (arg: string) => void;
  type: string;
  data: TDataForDatalist[] | undefined;
};

export const InputWithDatalist: React.FC<InputWithDataList> = (props) => {
  const { placeholder, type, data = null, getItem, ...rest } = props;

  enum ListState {
    Hidden = "hidden",
    Visible = "visible",
  }

  const [listState, setListState] = useState(ListState.Hidden);
  // const [inputValue, setInputValue] = useState<string>("");


  const listSeter = () => {
    if (listState === ListState.Hidden) {
      setListState(ListState.Visible);
    } else setListState(ListState.Hidden);
  };

  return (
    <form id="datalist" className={`${styles.datalist} ${styles[listState]}`}>
      <input
        onClick={() => setListState(ListState.Visible)}
        className={styles[`datalist-input`]}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      <i className={styles.icon} onClick={() => listSeter()} />
      <ul className={styles.list}>
        {data?.map((item) => (
          <li
            className={styles[`list-item`]}
            key={item.id}
            onClick={() => getItem(item.label.toString())}
          >
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
    </form>
  );
};
