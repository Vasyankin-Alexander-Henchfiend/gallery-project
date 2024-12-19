import styles from './picture.module.scss'
import { TPictureItem } from './picture.types'
import { BASE_URL } from '../../const/consts'
import { useGetAuthorsQuery, useGetLocationsQuery } from '../../api/api'

export const Picture = ({ item }: TPictureItem) => {
  const authorId = item.authorId
  const locationId = item.locationId
  const { data: authors, isLoading: authorsIsLoading } = useGetAuthorsQuery()
  const { data: locations, isLoading: locationsIsLoading } =
    useGetLocationsQuery()
  const author = authors?.find((item) => item.id === authorId)
  const location = locations?.find((item) => item.id === locationId)

  if (authorsIsLoading && locationsIsLoading) {
    return <div>Ну вот и всё</div>
  }

  return (
    <li className={styles[`picture-container`]}>
      <img
        className={styles.image}
        src={BASE_URL + item.imageUrl}
        alt={item.name}
      />
      <div className={styles[`white-box`]}>
        <div className={styles[`red-column`]}></div>
      </div>
      <div
        className={`${styles[`discription-container`]} ${styles[`move-down`]}`}
      >
        <h2 className={styles.name}>{item.name}</h2>
        <p className={styles.date}>{item.created}</p>
      </div>
      <div
        className={`${styles[`discription-container`]} ${styles[`move-right`]}`}
      >
        <h2 className={styles.name}>{author?.name}</h2>
        <p className={styles.date}>{location?.location}</p>
      </div>
    </li>
  )
}
