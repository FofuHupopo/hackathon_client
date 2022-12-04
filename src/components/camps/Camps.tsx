import {useUnit} from "effector-react";
import { FC } from "react";
import {$camps} from "../../effector/camps";
import Camp from "./camp/Camp";
import styles from "./Camps.module.scss";

const Camps: FC = () => {
  
  const camps = useUnit($camps)
  console.log(camps)
  
  return (
    <div className={styles.wrapper}>
      {camps.map((camp: any) => <Camp title={camp.title} camping_type={camp.camping_type} season={camp.season}/>)}
    </div>
  );
};

export default Camps;
