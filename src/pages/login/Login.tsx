import {useUnit} from "effector-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Header from "../../components/layout/header/Header";
import {$isAuth, loginFormSubmit} from "../../effector/user/authorization";
import styles from "./Login.module.scss";

const Login: FC = () => {
  
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    loginFormSubmit({
      email: data.username,
      password: data.password,
    });
  };
  
  const isAuth = useUnit($isAuth)
  console.log(isAuth)
  const navigate = useNavigate()
  
  if (isAuth) navigate('/lk')
  

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.regInputBlock}>
          <h1 className={styles.title}>Вход</h1>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Введите логин"
              {...register("username", { required: true })}
            />
            <input
              type="password"
              placeholder="Введите пароль"
              {...register("password", { required: true })}
            />
            <input type="submit" className={styles.loginBtn} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
