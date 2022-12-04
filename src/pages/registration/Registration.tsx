import { useUnit } from "effector-react/effector-react.umd";
import { ChangeEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import Header from "../../components/layout/header/Header";
import {
  $countrySuggestions,
  getCountrySuggestionsFx,
} from "../../effector/suggestions";
import {$isAuth, registrationFormSubmit} from "../../effector/user/authorization";
import { IRegistratinData } from "../../types/types";
import styles from "./Registration.module.scss";

const Registration = () => {
  const [role, setRole] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const [country, setCountry] = useState("");
  const [cliked, setCliked] = useState(false);

  const registrationOptions = [
    {
      value: "client",
      label: "Родитель",
    },
    {
      value: "organization",
      label: "Организация",
    },
  ];
  const navigate = useNavigate()
  const isAuth = useUnit($isAuth)
  
  if (isAuth) navigate('/lk')

  const getRole = () =>
    role ? registrationOptions.find((regRole) => regRole.value === role) : "";

  const roleChanged = (newValue: any) => {
    setRole(newValue.value);
  };

  const onSubmit = (data: IRegistratinData) => {
    if (data.password === data.resetPassword) {
      const formData = {
        username: data.username,
        email: data.email,
        lastname: data.lastname,
        firstname: data.firstname,
        patronymic: data.patronymic,
        phone: data.phone,
        password: data.password,
        role: role,
        citizenship: country
      };
      
      registrationFormSubmit(formData);
    } else {
      alert("Пароли не совпадают.");
    }
  };

  const suggestions = useUnit($countrySuggestions);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header />
        <div className={styles.wrapper}>
          <div className={styles.regInputBlock}>
            <h1 className={styles.title}>Регистрация</h1>
            <div className={styles.registrationInputs}>
              <div>
                <Select
                  options={registrationOptions}
                  value={getRole()}
                  onChange={roleChanged}
                  placeholder={"Выберите роль"}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      height: 40,
                      // width: 300,
                      marginBottom: 20,
                      borderColor: "#364F6B",
                      paddingLeft: 10,
                      color: "#B0B6C0",
                    }),
                  }}
                />
                <input
                  type="text"
                  placeholder="Введите логин"
                  className={`${styles.input} ${
                    errors?.username && styles.red
                  }`}
                  {...register("username", {
                    required: true,
                  })}
                />
                <input
                  type="text"
                  placeholder="Введите почту"
                  className={`${styles.input} ${errors?.email && styles.red}`}
                  {...register("email", {
                    required: "Это обязательное поле!",
                    pattern: {
                      value:
                        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                      message: "Введите корректную почту.",
                    },
                  })}
                />
                <input
                  type="text"
                  placeholder="Введите телефон"
                  className={`${styles.input} ${errors?.phone && styles.red}`}
                  {...register("phone", {
                    required: "Это обязательное поле!",
                    pattern: {
                      value:
                        /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                      message: "Введите корректный номер телефона.",
                    },
                  })}
                />
                <input
                  type="text"
                  placeholder="Введите имя"
                  className={`${styles.input} ${
                    errors?.firstname && styles.red
                  }`}
                  {...register("firstname", {
                    required: "Это обязательное поле!",
                  })}
                />
              </div>
              <div style={{ marginLeft: 20 }}>
                <input
                  type="text"
                  placeholder="Введите фамилию"
                  className={`${styles.input} ${
                    errors?.lastname && styles.red
                  }`}
                  {...register("lastname", {
                    required: "Это обязательное поле!",
                  })}
                />
                <input
                  type="text"
                  placeholder="Введите отчество"
                  className={`${styles.input} ${
                    errors?.patronymic && styles.red
                  }`}
                  {...register("patronymic", {
                    required: "Это обязательное поле!",
                  })}
                />
                <input
                  type="password"
                  placeholder="Введите пароль"
                  className={`${styles.input} ${
                    errors?.password && styles.red
                  }`}
                  {...register("password", {
                    required: "Это обязательное поле!",
                    minLength: {
                      value: 8,
                      message: "Минимальная длина пароля 8 символов.",
                    },
                    pattern: {
                      value:
                        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                      message:
                        "Пароль должен содержать минимум одну цифру и символ в верхнем регистре. Минимальная длина пароля 8 символов.",
                    },
                  })}
                />
                <input
                  type="password"
                  placeholder="Введите пароль повторно"
                  className={`${styles.input} ${
                    errors?.resetPassword && styles.red
                  }`}
                  {...register("resetPassword", {
                    required: "Это обязательное поле!",
                    minLength: {
                      value: 8,
                      message: "Минимальная длина пароля 8 символов.",
                    },
                    pattern: {
                      value:
                        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                      message:
                        "Пароль должен содержать минимум одну цифру и символ в верхнем регистре. Минимальная длина пароля 8 символов.",
                    },
                  })}
                />
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Введите ваше гражданство"
                    className={`${styles.input}`}
                    value={country}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setCliked(false);
                      getCountrySuggestionsFx(e.target.value);
                      setCountry(e.target.value);
                    }}
                  />
                  {suggestions.length !== 0 &&
                    !cliked &&
                    country.length !== 0 && (
                      <div className={styles.citySelect}>
                        <ul>
                          {suggestions.map(
                            (suggestion: string, index: number) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() => {
                                    setCountry(suggestion);
                                    setCliked(true);
                                  }}
                                >
                                  {suggestion}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className={styles.submitBtn}>
              <input
                type="submit"
                className={styles.loginBtn}
                value="Регистрация"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
