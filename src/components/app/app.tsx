import { Header } from '../header/header';
import { Main } from '../main/main';
import styles from './app.module.css';

function App() {

  return (
    <div className={styles.app}>
      <Header />
      <Main />
      <div className={styles.modal}>
        <button className={styles[`close-button`]}>
          <div className={styles[`close-icon`]}></div>
        </button>
        <div>первый инпут</div>
        <div>второй инпут</div>
        <div>третий инпут</div>
      </div>
    </div>
  )
}

export default App
