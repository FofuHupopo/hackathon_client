import { FC } from "react";
import styles from "./Camp.module.scss";

const Camp: FC = () => {
  return (
    <div className={styles.campWrapper}>
      <div className={styles.campTitle}>
        с 03 по 09 января 2020 года (7 дней) профильный лагерь «РДШ»
      </div>
      <div className={styles.campDescr}>
        Россия, 191014, Санкт-Петербург, ст.м. Чернышевская, ул.Парадная, д.3,
        к.2.Литер А , помещение 217Н
      </div>
      <ul>
        <li>Время года: “Зимние звезды”</li>
        <li>Название смены: “Педики”</li>
        <li>Тип лагеря: “Палаточный”</li>
      </ul>
      <div className={styles.bookingCamp}>
        <div className={styles.bookingBtns}>
          <button className={styles.blue}>Забронировать</button>
          <button className={styles.ocean}>Подробнее</button>
        </div>
        <div className={styles.campPrice}>5800 Рублей</div>
      </div>
    </div>
  );
};

export default Camp;
