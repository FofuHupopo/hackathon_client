import { FC } from "react";
import Filters from "../../components/filters/Filters";
import Header from "../../components/layout/header/Header";
import styles from "./Home.module.scss";

export const Home: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <Filters />
      </div>
    </div>
  );
};
