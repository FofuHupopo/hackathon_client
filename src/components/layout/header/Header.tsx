import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header: FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <ul>
        <li>
          <Link to="/">Бронирование путевок</Link>
        </li>
        <div>
          <li>
            <Link to="/">Вход</Link>
          </li>
          <li>
            <Link to="/">Регистрация</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Header;