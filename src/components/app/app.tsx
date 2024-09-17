import { Header } from '../header/header';
import { Main } from '../main/main';
import styles from './app.module.css';

function App() {

  return (
    <div className={styles.app}>
      <Header />
      <Main />
    </div>
  )
}

export default App
