import { useUnit } from "effector-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { $parent, sendParentInfoFx } from "../../effector/lk/parent";
import { $user } from "../../effector/user/authorization";
import styles from "./EditPersonalInfo.module.scss";

const EditPersonalInfo: FC = () => {
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [type, setType] = useState("rus");

  const { register, handleSubmit } = useForm();

  const getType = () => {
    return type ? options.find((option) => option.value === type) : "";
  };

  const handleChange = (newValue: any) => {
    setType(newValue.value);
  };

  const parent = useUnit($parent);

  console.log(type);

  const options = [
    {
      value: "rus",
      label: "Российский паспорт",
    },
    {
      value: "notrus",
      label: "Зарубежный паспорт",
    },
  ];

  const onSubmit = (data: any) => {
    sendParentInfoFx(data);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          width: 750,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: 350 }}>
          <Select
            placeholder={"Выберите тип документа"}
            options={options}
            value={getType()}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        {type === "rus" ? (
          <div>
            <div style={{ fontSize: 22, marginBottom: 15 }}>
              Российский паспорт
            </div>
            <div style={{ width: 350 }}>
              Введите серию паспорта
              <input
                {...register("series")}
                type="text"
                placeholder="Введите серию паспорта"
                className={styles.input}
              />
            </div>
            <div style={{ width: 350 }}>
              Введите номер паспорта
              <input
                {...register("number")}
                type="text"
                placeholder="Введите номер паспорта"
                className={styles.input}
              />
            </div>
            <div style={{ width: 350 }}>
              Кем выдан
              <input
                {...register("whom_issued")}
                type="text"
                placeholder="Введите паспорт"
                className={styles.input}
              />
            </div>
            <div style={{ width: 350 }}>
              Дата выдачи
              <input
                {...register("date_of_issue")}
                type="date"
                placeholder="Введите паспорт"
                className={styles.input}
              />
            </div>
            <input
              type="submit"
              className={`${styles.input} ${styles.submit}`}
              value="Сохранить"
            />
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 22, marginBottom: 15 }}>
              Зарубежный паспорт
            </div>
            <div style={{ width: 350 }}>
              Введите серию паспорта
              <input
                type="text"
                placeholder="Введите серию паспорта"
                className={styles.input}
                {...register("series")}
              />
            </div>
            <div style={{ width: 350 }}>
              Введите номер паспорта
              <input
                {...register("number")}
                type="text"
                placeholder="Введите номер паспорта"
                className={styles.input}
              />
            </div>
            <div style={{ width: 350 }}>
              Введите дату выдачи
              <input
                {...register("date_of_issue", {
                  required: true,
                })}
                type="date"
                placeholder="Введите серию паспорта"
                className={styles.input}
              />
            </div>
            <div style={{ width: 350 }}>
              Введите срок действия
              <input
                {...register("duration", {
                  required: true,
                })}
                type="date"
                placeholder="Введите серию паспорта"
                className={styles.input}
              />
            </div>
            <input
              type="submit"
              className={`${styles.input} ${styles.submit}`}
              value="Сохранить"
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default EditPersonalInfo;
