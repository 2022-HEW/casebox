import Image from 'next/image'
import Link from "next/link";
import styles from '../styles/service_select.module.css';


// 型定義
type CardType ={
    Card_link: string,
    Card_name: string,
    Card_desc: string
}

type imageType={
	imgPath: string,
	imgAlt: string,
}

const Service_cards = ()=> {
    return(
        <>
            <div className={styles.Container}>
                <Service_card Card_link={"/template_select"} Card_name={"テンプレートケース"} Card_desc={"もう既にデザインが仕上がっているケース"}/>
                <Service_card Card_link={"/scan"} Card_name={"オリジナルケース"} Card_desc={"写真を自由に入れることができるオリジナルのケース"}/>
                <Service_card Card_link={"/device_select"} Card_name={"手書きケース"} Card_desc={"自販機で自分で書いたイラストをケースできる"}/>
            </div>
        </>
    )
}

const Service_card = (
            { Card_link,Card_name,Card_desc }:CardType,
        )=>{

    return(
        <>
            <Link href={Card_link}>
                    <div className={styles.content}>
                        <div className={styles.images}></div>
                        <h3>{Card_name}</h3>
                        <p>{Card_desc}</p>
                    </div>
            </Link>
        </>
    )
}

export default Service_cards;