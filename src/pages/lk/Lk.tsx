import { Space, Table, Tag } from "antd";
import { useStore, useUnit } from "effector-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPersonalInfo from "../../components/editPersonalInfo/EditPersonalInfo";
import Header from "../../components/layout/header/Header";
import { $kids } from "../../effector/kids";
import {
  $childs,
  $parent,
  deleteChild,
  getChildsFx,
  getParentInfoFx,
  sendCode,
  sendEmail,
} from "../../effector/lk/parent";
import { $requests, getRequests } from "../../effector/lk/requests";
import { $user } from "../../effector/user/authorization";
import styles from "./Lk.module.scss";

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  birthday_date: string;
  address: string;
  patronymic: string;
  id: string;
}

interface ReqType {
  key: React.Key;
  representative: string;
  child: string;
  camp_event: string;
}

const data: DataType[] = [];

const Lk: FC = () => {
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    getChildsFx();
    getRequests();
  }, []);

  const requests = useUnit($requests);

  const user = useUnit($user);
  const parent = useUnit($parent);
  const kids = useUnit($childs);

  console.log(kids);
  const navigate = useNavigate();

  useEffect(() => {
    getParentInfoFx();
  }, []);

  const tableData = kids?.map((kid: any, index: number) => {
    return {
      key: index,
      id: kid?.id,
      firstName: kid?.firstname,
      lastName: kid?.lastname,
      birthday_date: kid?.birthday_date,
      address: kid?.registration_address?.city,
      patronymic: kid?.patronymic,
    };
  });

  const req: ReqType[] = requests?.map((kid: any, index: number) => {
    return {
      key: index,
      id: kid?.id,
      representative: `${kid?.representative?.lastname} ${kid?.representative?.firstname} ${kid?.representative?.patronymic}`,
      child: `${kid?.child?.lastname} ${kid?.child.firstname} ${kid?.child?.patronymic}`,
      camp_event: kid?.camp_event?.title,
    };
  });

  console.log(req);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {}, []);

  if (user.role === "organization")
    window.location.href = "http://localhost:8000/crm";

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.leftSidebar}>
          <div className={styles.editInfo} onClick={() => setActiveTab(0)}>
            Редактировать личную информацию
          </div>
          <div className={styles.editInfo} onClick={() => setActiveTab(1)}>
            Список детей
          </div>
          <div className={styles.editInfo} onClick={() => setActiveTab(2)}>
            Список заявок
          </div>
        </div>
        <div className={styles.rightSidebar}>
          {activeTab === 0 && (
            <div>
              <div style={{ fontSize: 24, marginBottom: 10 }}>
                Личная информация
              </div>
              {!(parent.russian_passport || parent.foreign_passport) ? (
                <EditPersonalInfo />
              ) : (
                <div style={{ marginBottom: 10 }}>
                  {parent.foreign_passport ? (
                    <div>
                      Серия {parent?.foreign_passport.series.slice(0, 2)} Номер{" "}
                      {parent?.foreign_passport.number}
                    </div>
                  ) : (
                    <div>
                      Серия {parent?.russian_passport.series} Номер{" "}
                      {parent?.russian_passport.number}
                    </div>
                  )}
                </div>
              )}

              {user.email_confirmed ? (
                <div>Почта подтверждена</div>
              ) : (
                <div>
                  <div style={{ fontSize: 20, marginBottom: 20 }}>
                    Подтверждение почты
                  </div>
                  <div className={styles.getCode}>
                    <div className={styles.codeBtn} onClick={() => sendEmail()}>
                      Получить код
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Введите код"
                        value={code}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setCode(e.target.value)
                        }
                        className={styles.inputSubmit}
                      />
                    </div>
                    <div
                      className={styles.codeBtn}
                      onClick={() => sendCode(code)}
                    >
                      Проверить код
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <div>
                <div style={{ fontSize: 24, marginBottom: 30 }}>
                  Список детей
                </div>
                <div>
                  {/*{kids.map((kid: any) => <li>{kid.firstname}</li>)}*/}
                  <Table
                    dataSource={tableData}
                    size={"large"}
                    pagination={false}
                  >
                    <Column title="Имя" dataIndex="firstName" key="firstName" />
                    <Column
                      title="Фамилия"
                      dataIndex="lastName"
                      key="lastName"
                    />
                    <Column
                      title="Отчество"
                      dataIndex="lastName"
                      key="lastName"
                    />
                    <Column
                      title="Дата рождения"
                      dataIndex="birthday_date"
                      key="birthday_date"
                    />
                    <Column title="Адрес" dataIndex="address" key="address" />
                    <Column
                      title="Удалить"
                      key="action"
                      render={(_: any, record: DataType) => (
                        <Space size="middle">
                          <a onClick={() => deleteChild(record.id)}>Удалить</a>
                        </Space>
                      )}
                    />
                  </Table>
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <div style={{ fontSize: 24, marginBottom: 30 }}>
                Список заявок
              </div>
              <Table dataSource={req} size={"large"} pagination={false}>
                <Column
                  title="Законный представитель"
                  dataIndex="representative"
                  key="representative"
                />
                <Column title="Ребенок" dataIndex="child" key="child" />
                <Column
                  title="Название смены"
                  dataIndex="camp_event"
                  key="camp_event"
                />
              </Table>
            </div>
          )}
          {activeTab === 3 && (
            <div style={{ fontSize: 24, marginBottom: 30 }}>
              Добавление ребенка
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lk;
