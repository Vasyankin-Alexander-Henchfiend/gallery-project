import { useGetAuthorsQuery, useGetLocationsQuery } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { closeModal } from "../../services/slices/modal";
import { Accordion } from "../accordion/accordion";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { ElementStates, Modal } from "../modal/modal";

import styles from "./app.module.scss";

function App() {
  const modal = useAppSelector((store) => store.modal.open);
  const dispatch = useAppDispatch();

  const { data: authors } = useGetAuthorsQuery('');
  const { data: locations } = useGetLocationsQuery('');

  const testArray = [
    '1', '2'
  ]

  console.log(authors);
  console.log(locations);

  return (
    <div className={styles.app}>
      <Header />
      <Main />
      <Modal
        onClose={() => dispatch(closeModal())}
        state={modal ? ElementStates.Open : ElementStates.Closed}
      >
        <Accordion
          type="text"
          title={"Artist"}
          placeholder={"Select the artist"}
          itemArray={testArray}
        />
        <Accordion
          type="text"
          title={"Location"}
          placeholder={"Select the location"}
          itemArray={testArray}
        />
        <Accordion
          type="text"
          title={"Years"}
          placeholder={"Select the location"}
          itemArray={testArray}
        />
      </Modal>
    </div>
  );
}

export default App;
