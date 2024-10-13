import styles from "./picture.module.css";
import { TPictureItem } from "./picture.types";
import { BASE_URL } from "../../const/pictures";

export const Picture = ({ item }: TPictureItem) => {
  return (
    <li className={styles[`picture-container`]}>
      <img
        className={styles.image}
        src={BASE_URL + item.imageUrl}
        alt={item.name}
      />
      <div className={styles[`discription-container`]}>
        <h2 className={styles.name}>{item.name}</h2>
        <p className={styles.date}>{item.created}</p>
      </div>
    </li>
  );
};
