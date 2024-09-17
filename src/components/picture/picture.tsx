import styles from './picture.module.css';
import { TPictureItem } from './picture.types';


export const Picture = ({ item }: TPictureItem) => {
  return (
    <div className={styles[`picture-container`]}>
      <img className={styles.image} src={item.imageUrl} alt={item.name} />
      <div className={styles[`discription-container`]}>
        <h2 className={styles.name}>{item.name}</h2>
        <p className={styles.date}>{item.created}</p>
      </div>
    </div>
  );
};