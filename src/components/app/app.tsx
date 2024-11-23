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

  const authorQuery = {
    q: "",
  };

  const locationQuery = {
    q: "",
  };

  const { data: authors } = useGetAuthorsQuery(authorQuery);
  const { data: locations } = useGetLocationsQuery(locationQuery);

  const authorsArray = authors?.map((item) => item.name);
  const locationsArray = locations?.map((item) => item.location);

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
          itemArray={authorsArray}
        />
        <Accordion
          type="text"
          title={"Location"}
          placeholder={"Select the location"}
          itemArray={locationsArray}
        />
        <Accordion
            type="text"
            title={"Years"}
            placeholder={"Select the location"}
            itemArray={locationsArray}
          />
      </Modal>
    </div>
  );
}

export default App;
