import styles from "./picture.module.scss";
import { TPictureItem } from "./picture.types";
import { BASE_URL } from "../../const/consts";

export const Picture = ({ item }: TPictureItem) => {
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
        <h2 className={styles.name}>{item.authorId}</h2>
        <p className={styles.date}>{item.locationId}</p>
      </div>
    </li>
  );
};
