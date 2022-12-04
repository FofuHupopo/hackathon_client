import { FC } from "react";
import styles from "./Camp.module.scss";


interface CampProps {
  title: string,
  camping_type: string,
  season: string
}


const Camp: FC<CampProps> = ({title, camping_type, season}) => {
  
  let type = ''
  let time = ''
  
  switch (camping_type) {
    case 'stationary':
      type = 'Стационарный'
      break
    case 'militaryPatriotic':
      type = 'Палаточный военно-патриотический лагерь'
      break
    case 'tourist':
      type = 'Палаточный туристический лагерь'
      break
  }
  
    switch (season) {
    case 'winter':
      time = 'Зимние заезды'
      break
    case 'spring':
      time = 'Весенние заезды'
      break
    case 'summer':
      time = 'Летние заезды'
      break
      case 'fall':
      time = "Осенние заезды"
      break
  }
  
  
  return (
    <div className={styles.campWrapper}>
      <div className={styles.campTitle}>
        {title}
      </div>
      <div className={styles.campDescr}>
        Россия, 191014, Санкт-Петербург, ст.м. Чернышевская, ул.Парадная, д.3,
        к.2.Литер А , помещение 217Н
      </div>
      <ul>
        <li>Время года: {time}</li>
        <li>Название смены: “Лютики”</li>
        <li>Тип лагеря: {type}</li>
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
