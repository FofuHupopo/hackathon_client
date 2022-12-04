import { FC } from "react";
import Header from "../../components/layout/header/Header";
import styles from "./Lk.module.scss";

const Lk: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.leftSidebar}>
          <div>Редактировать личную информацию</div>
        </div>
        <div className={styles.rightSidebar}></div>
      </div>
    </div>
  );
};

export default Lk;
