import {FC, useEffect} from "react";
import Camps from "../../components/camps/Camps";
import Filters from "../../components/filters/Filters";
import Header from "../../components/layout/header/Header";
import {getCampsFx} from "../../effector/camps";
import styles from "./Home.module.scss";

export const Home: FC = () => {
  
  
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <Filters />
        <div className={styles.camps}>
          <h2 className={styles.campsTitle}>
            Оздоровительные лагеря в Оренбургской области
          </h2>
          <div>
            Найдено <span className={styles.campsCount}>15</span> лагерей
          </div>
          <Camps />
        </div>
      </div>
    </div>
  );
};
