import { useUnit } from "effector-react";
import { FC } from "react";
import { createRequestFx } from "../../../effector/camps";
import { $kids } from "../../../effector/kids";
import { $childs } from "../../../effector/lk/parent";
import styles from "./Camp.module.scss";

interface CampProps {
  title: string;
  camping_type: string;
  season: string;
  camp_organization: string;
  description: string;
  price: string;
  id: string;
}

const Camp: FC<CampProps> = ({
  title,
  camping_type,
  season,
  camp_organization,
  description,
  price,
  id,
}) => {
  let type = "";
  let time = "";

  switch (camping_type) {
    case "stationary":
      type = "Стационарный";
      break;
    case "militaryPatriotic":
      type = "Палаточный военно-патриотический лагерь";
      break;
    case "tourist":
      type = "Палаточный туристический лагерь";
      break;
  }

  const kids = useUnit($childs);

  switch (season) {
    case "winter":
      time = "Зимние заезды";
      break;
    case "spring":
      time = "Весенние заезды";
      break;
    case "summer":
      time = "Летние заезды";
      break;
    case "fall":
      time = "Осенние заезды";
      break;
  }

  return (
    <div className={styles.campWrapper}>
      <div className={styles.campTitle}>{title}</div>
      <div className={styles.campDescr}>{description}</div>
      <ul>
        <li>Время года: {time}</li>
        <li>Название организации: "{camp_organization}"</li>
        <li>Тип лагеря: {type}</li>
      </ul>
      <div className={styles.bookingCamp}>
        {kids.length > 0 ? (
          <div>
            {kids?.map((kid: any) => (
              <div className={styles.bookingBtns}>
                <div>{kid.firstname}</div>
                <button
                  className={styles.blue}
                  onClick={() => createRequestFx({ id: kid.id, event: id })}
                >
                  Отправить в лагерь
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>Зарегистрируйте ребенка!</div>
        )}
        <div className={styles.campPrice}>{price}</div>
      </div>
    </div>
  );
};

export default Camp;
