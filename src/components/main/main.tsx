import React from 'react';
import styles from './main.module.css';
import { testArray } from '../../const/pictures';
import { Picture } from '../picture/picture';
import { TPicture } from '../types/types';


export const Main: React.FC = () => {
  const pictures = testArray.map((item: TPicture) => {
    return <Picture item={item} />
  });

  return (
    <main className={styles.main}>
      <section className={styles.gallery}>{pictures}</section>
    </main>
  );
};