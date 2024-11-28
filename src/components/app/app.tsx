import { useGetAuthorsQuery, useGetLocationsQuery } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { closeModal } from "../../services/slices/modal";
import { InputWithDataList } from "../../ui/datalist/datalist";
import { Accordion } from "../accordion/accordion";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { ElementStates, Modal } from "../modal/modal";

import styles from "./app.module.scss";

function App() {
  const modal = useAppSelector((store) => store.modal.open);
  const dispatch = useAppDispatch();

  const { data: authors } = useGetAuthorsQuery();
  const { data: locations } = useGetLocationsQuery();

  const testArray = ["1", "2"];

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
        <Accordion title={"Artists"}>
          <InputWithDataList
            placeholder={"Select the artist"}
            type={"text"}
            data={testArray}
          />
        </Accordion>

        <Accordion title={"Locations"}>
          <InputWithDataList
            placeholder={"Select the artist"}
            type={"text"}
            data={testArray}
          />
        </Accordion>

        <Accordion title={"Years"}>
          <input />
        </Accordion>
      </Modal>
    </div>
  );
}

export default App;
