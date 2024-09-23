import { useState } from "react";
import styles from './search.module.css';

export const Search = () => {
    const [searchValue, setSearchValue] = useState<string | number | undefined>(undefined)

    return (
      <div>
        <input
          type="text"
          value={searchValue}
          placeholder="Painting title"
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.search}
        />
        <button className={styles[`filter-button`]}>
          <div className={styles[`filter-icon`]} />
        </button>
      </div>
    );
}
