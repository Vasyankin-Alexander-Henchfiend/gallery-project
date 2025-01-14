import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useGetAuthorsQuery, useGetLocationsQuery } from '../../api/api'
import { getPureArray } from '../../const/utils'
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks'
import { closeModal } from '../../services/slices/modal'
import { InputWithDatalist } from '../../ui/datalist/datalist'
import { YearsForm } from '../../ui/years-form/years-form'
import { Accordion } from '../accordion/accordion'
import { Header } from '../header/header'
import { Main } from '../main/main'
import { ElementStates, Modal } from '../modal/modal'
import { TAuthor, TDataForDatalist, TLocation } from '../types/types'
import styles from './app.module.scss'
import {
  getAuthorId,
  getLocationId,
  removeAllQueryData,
} from '../../services/slices/query'
import { Theme } from '../theme/theme'

function App() {
  const modal = useAppSelector((store) => store.modal.open)
  const dispatch = useAppDispatch()

  const { data: authors, isSuccess: authorsIsSuccess } = useGetAuthorsQuery()
  const { data: locations, isSuccess: locationssIsSuccess } =
    useGetLocationsQuery()

  const [authorInputValue, setAuthorInputValue] = useState<string>('')
  const [locationInputValue, setLocationInputValue] = useState<string>('')
  const [choosenAuthorId, setChoosenAuthorId] = useState<number | undefined>(
    undefined,
  )
  const [choosenLocationId, setChoosenLocationId] = useState<
    number | undefined
  >(undefined)

  //Массивы для парсинга в компоненте
  const [authorsList, setAuthorsList] = useState<
    TDataForDatalist[] | undefined
  >([])
  const [locationsList, setLocationsList] = useState<
    TDataForDatalist[] | undefined
  >([])

  //Массивы для сравнения при запoлнении инпута
  const originalAuthorsList = useRef<TDataForDatalist[]>([])
  const originalLocationsList = useRef<TDataForDatalist[]>([])

  useEffect(() => {
    originalAuthorsList.current =
      getPureArray<TAuthor>(authors, 'name', 'id') ?? []
    setAuthorsList(originalAuthorsList.current)
  }, [authors])

  useEffect(() => {
    originalLocationsList.current =
      getPureArray<TLocation>(locations, 'location', 'id') ?? []
    setLocationsList(originalLocationsList.current)
  }, [locations])

  const onAuthorsListItemClick = useCallback(
    (authorInputValue: string, authorId: number) => {
      setAuthorInputValue(authorInputValue)
      setChoosenAuthorId(authorId)
    },
    [],
  )

  const onLocationListItemClick = useCallback(
    (locationInputValue: string, locationId: number) => {
      setLocationInputValue(locationInputValue)
      setChoosenLocationId(locationId)
    },
    [],
  )

  const authorsFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAuthorInputValue(event.target.value)
  }, [])

  const locationsFilter = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLocationInputValue(event.target.value)
    },
    [],
  )

  //Ищем совпадения при вводе текста в инпут автора
  useEffect(() => {
    const math = originalAuthorsList.current.filter((item) =>
      item.label
        .toString()
        .toLowerCase()
        .includes(authorInputValue.toLowerCase()),
    )
    setAuthorsList(math)
  }, [authorInputValue])

  //Ищем совпадения при вводе текста в инпут локации
  useEffect(() => {
    const math = originalLocationsList.current.filter((item) =>
      item.label
        .toString()
        .toLowerCase()
        .includes(locationInputValue.toLowerCase()),
    )
    setLocationsList(math)
  }, [locationInputValue])

  const onClearAllInputs = useCallback(() => {
    setAuthorInputValue('')
    setLocationInputValue('')
    setChoosenAuthorId(undefined)
    setChoosenLocationId(undefined)
    dispatch(removeAllQueryData())
  }, [dispatch])

  const onShowResults = useCallback(() => {
    // dispatch(closeModal());
    if (choosenAuthorId) {
      dispatch(getAuthorId(choosenAuthorId))
    }
    if (choosenLocationId) {
      dispatch(getLocationId(choosenLocationId))
    }
  }, [choosenAuthorId, choosenLocationId, dispatch])

  return (
    <div className={styles.app}>
      <Theme />
      <Header />
      <Main />
      <Modal
        onClose={() => dispatch(closeModal())}
        state={modal ? ElementStates.Open : ElementStates.Closed}
        onClearClick={onClearAllInputs}
        onShowResultsClick={onShowResults}
      >
        <Accordion title={'Artists'}>
          {authorsIsSuccess && locationssIsSuccess ? (
            <InputWithDatalist
              placeholder={'Select the artist'}
              type={'text'}
              dataArray={authorsList}
              value={authorInputValue}
              onChange={authorsFilter}
              onGetItem={onAuthorsListItemClick}
            />
          ) : null}
        </Accordion>

        <Accordion title={'Locations'}>
          {authorsIsSuccess && locationssIsSuccess ? (
            <InputWithDatalist
              placeholder={'Select the location'}
              type={'text'}
              dataArray={locationsList}
              value={locationInputValue}
              onChange={locationsFilter}
              onGetItem={onLocationListItemClick}
            />
          ) : null}
        </Accordion>

        <Accordion title={'Years'}>
          <YearsForm />
        </Accordion>
      </Modal>
    </div>
  )
}

export default App
