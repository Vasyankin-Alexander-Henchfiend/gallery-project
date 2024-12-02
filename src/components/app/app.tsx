import { useGetAuthorsQuery, useGetLocationsQuery } from "../../api/api";
import { getPureArray } from "../../const/utils";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { closeModal } from "../../services/slices/modal";
import { InputWithDatalist } from "../../ui/datalist/datalist";
import { YearsForm } from "../../ui/years-form/years-form";
import { Accordion } from "../accordion/accordion";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { ElementStates, Modal } from "../modal/modal";
import { TAuthor, TLocation } from "../types/types";

import styles from "./app.module.scss";

function App() {
  const modal = useAppSelector((store) => store.modal.open);
  const dispatch = useAppDispatch();

  const { data: authors, isSuccess: authorsIsSuccess } = useGetAuthorsQuery();
  const { data: locations, isSuccess: locationssIsSuccess } =
    useGetLocationsQuery();

  const authorsList = getPureArray<TAuthor>(authors, "name", "id");
  const locationsList = getPureArray<TLocation>(locations, "location", "id");

  return (
    <div className={styles.app}>
      <Header />
      <Main />
      <Modal
        onClose={() => dispatch(closeModal())}
        state={modal ? ElementStates.Open : ElementStates.Closed}
      >
        <Accordion title={"Artists"}>
          {authorsIsSuccess && locationssIsSuccess ? (
            <InputWithDatalist
              placeholder={"Select the artist"}
              type={"text"}
              data={authorsList}
            />
          ) : null}
        </Accordion>

        <Accordion title={"Locations"}>
          {authorsIsSuccess && locationssIsSuccess ? (
            <InputWithDatalist
              placeholder={"Select the location"}
              type={"text"}
              data={locationsList}
            />
          ) : null}
        </Accordion>

        <Accordion title={"Years"}>
          <YearsForm  />
        </Accordion>
      </Modal>
    </div>
  );
}

export default App;
