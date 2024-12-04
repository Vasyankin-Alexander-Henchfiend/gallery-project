import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
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
import { TAuthor, TDataForDatalist, TLocation } from "../types/types";

import styles from "./app.module.scss";

function App() {
  const modal = useAppSelector((store) => store.modal.open);
  const dispatch = useAppDispatch();

  const { data: authors, isSuccess: authorsIsSuccess } = useGetAuthorsQuery();
  const { data: locations, isSuccess: locationssIsSuccess } =
    useGetLocationsQuery();

  const [authorInputValue, setAuthorInputValue] = useState<string>("");
  const [locationInputValue, setLocationInputValue] = useState<string>("");

  //Массивы для парсинга в компоненте
  const [authorsList, setAuthorsList] = useState<
    TDataForDatalist[] | undefined
  >([]);
  const [locationsList, setLocationsList] = useState<
    TDataForDatalist[] | undefined
  >([]);

  //Массивы для сравнения при запoлнении инпута
  const originalAuthorsList = useRef<TDataForDatalist[]>([]);
  const originalLocationsList = useRef<TDataForDatalist[]>([]);

  useEffect(() => {
    originalAuthorsList.current =
      getPureArray<TAuthor>(authors, "name", "id") ?? [];
    setAuthorsList(originalAuthorsList.current);
  }, [authors]);

  useEffect(() => {
    originalLocationsList.current =
      getPureArray<TLocation>(locations, "location", "id") ?? [];
    setLocationsList(originalLocationsList.current);
  }, [locations]);

  const onAuthorsListItemClick = useCallback((authorInputValue: string) => {
    setAuthorInputValue(authorInputValue);
  }, []);

  const onLocationListItemClick = useCallback((locationInputValue: string) => {
    setLocationInputValue(locationInputValue);
  }, []);

  const authorsFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAuthorInputValue(event.target.value);
  }, []);

  useEffect(() => {
    const math = originalAuthorsList.current.filter((item) =>
      item.label
        .toString()
        .toLowerCase()
        .includes(authorInputValue.toLowerCase())
    );
    setAuthorsList(math);
  }, [authorInputValue]);

  const locationsFilter = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLocationInputValue(event.target.value);
    },
    []
  );

  useEffect(() => {
    const math = originalLocationsList.current.filter((item) =>
      item.label
        .toString()
        .toLowerCase()
        .includes(locationInputValue.toLowerCase())
    );
    setLocationsList(math);
  }, [locationInputValue]);

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
              value={authorInputValue}
              onChange={authorsFilter}
              onGetItem={onAuthorsListItemClick}
            />
          ) : null}
        </Accordion>

        <Accordion title={"Locations"}>
          {authorsIsSuccess && locationssIsSuccess ? (
            <InputWithDatalist
              placeholder={"Select the location"}
              type={"text"}
              data={locationsList}
              value={locationInputValue}
              onChange={locationsFilter}
              onGetItem={onLocationListItemClick}
            />
          ) : null}
        </Accordion>

        <Accordion title={"Years"}>
          <YearsForm />
        </Accordion>
      </Modal>
    </div>
  );
}

export default App;
