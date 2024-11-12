import { Accordion } from "../accordion/accordion";
import { Header } from "../header/header";
import { Main } from "../main/main";
import styles from "./app.module.scss";

function App() {
  const array = ["Федот", "Петруха", "Алексашка"];

  return (
    <div className={styles.app}>
      <Header />
      <Main />
      <div className={styles.modal}>
        <button className={styles[`close-button`]}>
          <i className={styles[`close-icon`]} />
        </button>
        <Accordion
          type="text"
          title={"Artist"}
          placeholder={"Select the artist"}
          itemArray={array}
        />
        <Accordion
          type="text"
          title={"Location"}
          placeholder={"Select the location"}
          itemArray={array}
        />
        <Accordion
          type="text"
          title={"Years"}
          placeholder={"Select the location"}
          itemArray={array}
        />
      </div>
    </div>
  );
}

export default App;
