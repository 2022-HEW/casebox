import Nav from "../components/nav";
import Box from "../components/Box";
import styles from "../styles/pay.module.css";
import Icon from "../../public/image/money.svg";


const pay =()=>{
    return(
        <div>     
            <div id={styles.wrap}>
                <div className={styles.block}>
                    <p className={styles.write}>支払額</p>
                    <p className={styles.money}>1500</p>
                    <p className={styles.en}>円</p>
                </div>
                <div className={styles.block1}>
                    <p className={styles.write}>投入額</p>
                    <p className={styles.money}>0</p>
                    <p className={styles.en}>円</p>
                </div>
                <div className={styles.block2}>
                    <p className={styles.write}>おつり</p>
                    <p className={styles.money}>0</p>
                    <p className={styles.en}>円</p>
                </div>
                <div className={styles.select}>
                    <img src={Icon}  alt="アイコン" />
                </div>
            </div>
            <Box/>
            <Nav/>
        </div>
    )
}

export default pay