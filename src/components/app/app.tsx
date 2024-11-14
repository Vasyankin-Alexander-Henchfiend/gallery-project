import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { closeModal } from "../../services/slices/modal";
import { Accordion } from "../accordion/accordion";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { Modal } from "../modal/modal";
import styles from "./app.module.scss";

function App() {
  const array = ["Федот", "Петруха", "Алексашка"];
  const modal = useAppSelector((store) => store.modal.open);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.app}>
      <Header />
      <Main />
      {modal && (
        <Modal onClose={() => dispatch(closeModal())}>
          <Accordion
            type="text"
            title={"Artist"}
            placeholder={"Select the artist"}
            itemArray={array}
          />
          {/* <Accordion
            type="text"
            title={"Location"}
            placeholder={"Select the location"}
            itemArray={array}
          />
          <Accordion
            type="text"
            title={"Years"}
            placeholder={"Select the location"}
            itemArray={array}
          /> */}
        </Modal>
      )}
    </div>
  );
}

export default App;
