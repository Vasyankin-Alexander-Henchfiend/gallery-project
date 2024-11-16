import { useState } from 'react';
import styles from './datalist.module.scss';

interface IInputWithDataList {
  placeholder: string;
  type: string;
  data: string[]
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
  const [inputValue, setInputValue] = useState<string>('');

  const listSeter = () => {
    if (listState === ListState.Hidden) {
      setListState(ListState.Visible);
    } else setListState(ListState.Hidden);

  };

  return (
    <div id="datalist" className={`${styles.datalist} ${styles[listState]}`}>
      <input
        onClick={() => setListState(ListState.Visible)}
        // onBlur={() => setListState(ListState.Hidden)}
        className={styles[`datalist-input`]}
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        {...rest}
      />
      <i className={styles.icon} onClick={() => listSeter()} />
      <ul className={styles.list}>
        {data.map((item) => (
          <li key={item} onClick={() => setInputValue(item)}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
