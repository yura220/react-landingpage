import styles from "./css/Aside.module.css";
import Snslists from "./Snslists";
const Aside = ({ subject }) => {
  return (
    <aside id="aside" className={`${styles.bgcolor} flex-column`}>
      <h2 className={styles.h6}>{subject}</h2>
      <Snslists text1='인스타그램' text2='핀터레스트' text3='노션' />
    </aside>
  );
};

export default Aside;