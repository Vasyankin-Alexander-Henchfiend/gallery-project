import { useState } from 'react'
import styles from './datalist.module.scss'
import { ModalOverlay } from '../../components/modal/modal-overlay/modal-overlay'
import { TDataForDatalist } from '../../components/types/types'
import { Input } from '../input/input'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

interface InputWithDataList extends React.HTMLProps<HTMLInputElement> {
  placeholder: string
  onGetItem: (arg: string, arg1: number) => void
  type: string
  dataArray: TDataForDatalist[] | undefined
}

export const InputWithDatalist: React.FC<InputWithDataList> = (props) => {
  const { placeholder, type, dataArray = null, onGetItem, ...rest } = props

  enum ListState {
    Hidden = 'hidden',
    Visible = 'visible',
  }

  const [listState, setListState] = useState(ListState.Hidden)

  const listSeter = () => {
    if (listState === ListState.Hidden) {
      setListState(ListState.Visible)
    } else setListState(ListState.Hidden)
  }

  return (
    <form id="datalist" className={`${styles.datalist} ${styles[listState]}`}>
      <Input
        onClick={() => listSeter()}
        extraClass={styles[`datalist-input`]}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      <i className={styles.icon} onClick={() => listSeter()} />
      {listState === ListState.Visible && (
        <>
          <ul className={styles.list}>
            {dataArray != undefined && dataArray?.length > 0 ? (
              <SimpleBar autoHide={false} className={styles[`simple-bar`]}>
                {dataArray?.map((item) => (
                  <li
                    className={styles[`list-item`]}
                    key={item.id}
                    onClick={() => onGetItem(item.label.toString(), item.id)}
                  >
                    {item.label}
                  </li>
                ))}
              </SimpleBar>
            ) : (
              <div className={styles[`no-math`]}>
                There are no matching results for your query.
              </div>
            )}
          </ul>
          <ModalOverlay
            extraClass={styles.overlay}
            onClose={() => listSeter()}
          />
        </>
      )}
    </form>
  )
}
