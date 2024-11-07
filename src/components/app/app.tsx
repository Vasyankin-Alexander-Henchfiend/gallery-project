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
          <div className={styles[`close-icon`]}></div>
        </button>
        <Accordion
          title={"Artist"}
          placeholder={"Select the artist"}
          itemArray={array}
        />
        <Accordion
          title={"Location"}
          placeholder={"Select the location"}
          itemArray={array}
        />
        <div>третий инпут</div>
      </div>
    </div>
  );
}

export default App;
