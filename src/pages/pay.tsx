import Nav from "../components/common/Nav";
import Box from "../components/common/Box";
import styles from "../styles/pay.module.css";
import Image from "next/image";
import Cash from "../../public/image/money.svg";
import trafic from "../../public/image/t_money.svg";
import electric from "../../public/image/e_money.svg";
import other from "../../public/image/other_money.svg";
import { useRecoilValue } from "recoil";
import { productState } from '../atoms/atoms';


const pay = () => {
    // 今までの情報をリセット
    return (
        <Box>
            <Nav >

                <div id={styles.wrap}>

                    <Price_result id={styles.price} write="支払額" />
                    <Price_result id={styles.payed} write="投入額" />
                    <Price_result id={styles.back} write="おつり" />


                    <div className={styles.buttons}>

                        <Buttons imgPath={Cash} name="現金" classname={styles.payType_a} />
                        <Buttons imgPath={trafic} name="クレジットカード" classname={styles.payType}/>
                        <Buttons imgPath={electric} name="交通系電子マネー" classname={styles.payType}/>
                        <Buttons imgPath={other} name="その他" classname={styles.payType}/>

                    </div>
                </div>
            </Nav>
        </Box>
    )

}

interface pay_props {
    write: string;
    id: string;
}
const Price_result = ({ write, id }: pay_props) => {
    const { m_product_price } = useRecoilValue(productState)
    return (
        <div className={styles.block2} id={id}>
            <p className={styles.write}>{write}</p>
            <p className={styles.money}>{m_product_price}</p>
            <p className={styles.en}>円</p>
        </div>
    )
}

interface btn_props {
    imgPath: string;
    name: string;
    classname: string
}
const Buttons = ({ imgPath, name, classname }: btn_props) => {

    return (
        <a className={classname}>
            <div className={styles.btnContent}>
                <Image src={imgPath} alt="現金の画像" id={styles.image} />
                <p id={styles.btnname}>{name}</p>
            </div>
        </a>
    )
}

export default pay