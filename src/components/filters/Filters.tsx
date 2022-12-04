import {ChangeEvent, FC, useEffect, useState} from "react";
import Select from "react-select";
import {getCampsFx} from "../../effector/camps";
import styles from "./Filters.module.scss";

const Filters: FC = () => {
  const [campTime, setCampTime] = useState("");
  const [campType, setCampType] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const endDateOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const startDateChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const timeOptions = [
    { value: "winter", label: "Зимние заезды" },
    { value: "spring", label: "Весенние заезды" },
    { value: "summer", label: "Летние заезды" },
    { value: "autumn", label: "Осенние заезды" },
  ];
  
  useEffect(() => {
    getCampsFx({time: campTime, start: startDate, type: campType, end: endDate})
  }, [campType, campTime, startDate, endDate])
  
  
  

  const typeOptions = [
    { value: "stationary", label: "Стационарный лагерь" },
    {
      value: "militaryPatriotic",
      label: "Палаточный военно-патриотический лагерь",
    },
    { value: "tourist", label: "Палаточный туристический лагерь" },
  ];

  const getTime = () => {
    return campTime ? timeOptions.find((t) => t.value === campTime) : "";
  };

  const summerTypeOptions = [
    {
      value: "militaryPatriotic",
      label: "Палаточный военно-патриотический лагерь",
    },
    { value: "tourist", label: "Палаточный туристический лагерь" },
  ];

  const onTimeChange = (newValue: any) => {
    if (
      newValue.value === "winter" ||
      newValue.value === "autumn" ||
      newValue.value === "spring"
    ) {
      setCampType("stationary");
    } else {
      setCampType("");
    }
    setCampTime(newValue.value);
  };

  const getType = () => {
    return campType ? typeOptions.find((type) => type.value === campType) : "";
  };

  const onTypeChange = (newValue: any) => {
    setCampType(newValue.value);
  };

  console.log(endDate);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.filtersTitle}>Фильтры</h1>
      <div className={styles.filter}>
        <h2>Время года для отдыха: </h2>
        <Select
          options={timeOptions}
          value={getTime()}
          onChange={onTimeChange}
          placeholder={"Выберите время года"}
        />
      </div>

      <div className={styles.filter}>
        <h2>Тип лагеря: </h2>
        <Select
          options={typeOptions}
          value={getType()}
          onChange={onTypeChange}
          isDisabled={
            campTime === "winter" ||
            campTime === "autumn" ||
            campTime === "spring"
          }
          placeholder={"Выберите тип лагеря"}
        />
      </div>
      <div className={styles.filter}>
        <h2>Дата начала смены: </h2>
        <input
          type="date"
          className={styles.datePicker}
          value={startDate}
          onChange={startDateChanged}
        />
      </div>

      <div className={styles.filter}>
        <h2>Дата окончания смены: </h2>
        <input
          type="date"
          className={styles.datePicker}
          value={endDate}
          onChange={endDateOnChange}
          min={startDate}
        />
      </div>
    </div>
  );
};

export default Filters;
