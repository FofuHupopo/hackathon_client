import {useStore, useUnit} from "effector-react";
import {FC, useState} from "react";
import Header from "../../components/layout/header/Header";
import {$kids} from "../../effector/kids";
import {$user} from "../../effector/user/authorization";
import styles from "./Lk.module.scss";

const Lk: FC = () => {
  
  const user = useUnit($user)
  
  const [activeTab, setActiveTab] = useState(0)
  const kids = useStore($kids)
  
  console.log(user)
  
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.leftSidebar}>
          <div style={{textAlign: 'center'}}>
            Здравствуйте, {user.name}.
          </div>
          <div style={{textAlign: 'center'}}>
                      {user.email}
          </div>
          <div className={styles.editInfo} onClick={() => setActiveTab(0)}>Редактировать личную информацию</div>
          <div className={styles.editInfo} onClick={() => setActiveTab(1)}>Список детей</div>
          <div className={styles.editInfo} onClick={() => setActiveTab(2)}>Список заявок</div>
        </div>
        <div className={styles.rightSidebar}>
          {activeTab === 0 && <div style={{fontSize: 20}}>
            Личная информация
          </div>}
          {activeTab === 1 && <div>
            <div style={{fontSize: 20}}>Список детей</div>
            <div>
              {kids.map((kid: any) => <li>{kid.firstname}</li>)}
            </div>
          </div>}
          {activeTab === 2 && <div style={{fontSize: 20}} >
            Список заявок
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Lk;
