import { useUnit } from "effector-react";
import { FC } from "react";
import { $camps } from "../../effector/camps";
import Camp from "./camp/Camp";
import styles from "./Camps.module.scss";

const Camps: FC = () => {
  const camps = useUnit($camps);
  console.log("camps", camps);

  return (
    <div className={styles.wrapper}>
      {camps.map((camp: any) => (
        <Camp
          title={camp?.title}
          camping_type={camp?.camping_type}
          season={camp?.season}
          camp_organization={camp?.camp_organization?.title}
          id={camp?.id}
          description={camp?.description}
          price={camp?.price}
        />
      ))}
    </div>
  );
};

export default Camps;
