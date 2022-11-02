import Nav from "../components/common/Nav";
import Box from "../components/common/Box";
import styles from "../styles/pay.module.css";
import Image from "next/image";
import Cash from "../../public/image/money.svg";



const pay = () => {
    return (
        <Box>
            <Nav >

            <div id={styles.wrap}>
                {/* <div className={styles.block}>
                    <p className={styles.write}>支払額</p>
                    <p className={styles.money}>1500</p>
                    <p className={styles.en}>円</p>
                </div> */}
                {/* <Price_result/> */}
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
                <div className={styles.buttons}>
                    <div className={styles.cash}>
                        <Image src={Cash} alt="現金の画像"/>
                        <p id={styles.btnname}>現金</p>
                    </div>
                    <div className={styles.cash}>
                        <Image src={Cash} alt="現金の画像"/>
                    </div>
                    <div className={styles.cash}>
                        <Image src={Cash} alt="現金の画像"/>
                    </div>
                    <div className={styles.cash}>
                        <Image src={Cash} alt="現金の画像"/>
                    </div>
                </div> 
            </div>
            </Nav>
        </Box>
    )

}

const Price_result =  () =>{

    return(
         <div className={styles.block}>
            <p className={styles.write}>支払額</p>
            <p className={styles.money}>1500</p>
            <p className={styles.en}>円</p>
        </div>
    )
}



export default pay