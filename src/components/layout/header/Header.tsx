import {useUnit} from "effector-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import {$isAuth, logout} from "../../../effector/user/authorization";
import styles from "./Header.module.scss";

const Header: FC = () => {
  
  const isAuth = useUnit($isAuth)
  
  
  return (
    <div className={styles.headerWrapper}>
      <ul>
        <li>
          <Link to="/">Бронирование путевок</Link>
        </li>
        {isAuth ? <div>
          <div onClick={() => logout()}><li>Выход</li></div>
          <div><Link to="/lk"><li>Личный кабинет</li></Link></div>
        </div> :         <div>
          <li>
            <Link to="/login">Вход</Link>
          </li>
          <li>
            <Link to="/registration">Регистрация</Link>
          </li>
        </div>
}
      </ul>
    </div>
  );
};

export default Header;
