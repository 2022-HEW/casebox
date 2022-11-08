import Nav from "../components/common/Nav";
import Box from "../components/common/Box";
import styles from "../styles/pay.module.css";
import Image from "next/image";
import Cash from "../../public/image/money.svg";
import trafic from "../../public/image/t_money.svg";
import electric from "../../public/image/e_money.svg";



const pay = () => {
    return (
        <Box>
            <Nav >

                <div id={styles.wrap}>

                    <Price_result write="支払額" money="1800" />
                    <Price_result write="投入額" money="0" />
                    <Price_result write="おつり" money="0" />


                    <div className={styles.buttons}>

                        <Buttons imgPath={Cash} name="現金"/>
                        <Buttons imgPath={electric} name="電子マネー"/>
                        <Buttons imgPath={trafic} name="交通系"/>
                        <Buttons imgPath={Cash} name="現金"/>
                        {/* <a className={styles.cash}>
                            <Image src={Cash} alt="現金の画像" />
                        </a>
                        <a className={styles.cash}>
                            <Image src={Cash} alt="現金の画像" />
                        </a>
                        <a className={styles.cash}>
                            <Image src={Cash} alt="現金の画像" /> */}
                        
                    </div>
                </div>
            </Nav>
        </Box>
    )

}

interface pay_props {
    write: string;
    money: string;
}

const Price_result = ({ write, money }: pay_props) => {
    return (
        <div className={styles.block2}>
            <p className={styles.write}>{write}</p>
            <p className={styles.money}>{money}</p>
            <p className={styles.en}>円</p>
        </div>
    )
}

interface btn_props {
    imgPath: string;
    name: string;
}
const Buttons = ({ imgPath, name }: btn_props) => {

    return (
        <a className={styles.cash}>
            <Image src={imgPath} alt="現金の画像" />
            <p id={styles.btnname}>{name}</p>
        </a>
    )
}

export default pay