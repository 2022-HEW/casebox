import styles from '../styles/service_select.module.css'
import Link from "next/link";


// 型定義
type CardType ={
    Card_link: string,
    Card_name: string,
    Card_desc: string
}

const Service_cards = ()=> {
    return(
        <>
            <Service_card Card_link={"./template_select.php"} Card_name={"テンプレートケース"} Card_desc={"もう既にデザインが仕上がっているケース"}/>
            <Service_card Card_link={"./product_edit.html"} Card_name={"オリジナルケース"} Card_desc={"写真を自由に入れることができるオリジナルのケース"}/>
            <Service_card Card_link={"./draw_edit.html"} Card_name={"手書きケース"} Card_desc={"自販機で自分で書いたイラストをケースできる"}/>
        </>
    )
}

const Service_card = ({ Card_link,Card_name,Card_desc }:CardType)=>{
    return(
        <>
            <Link href={Card_link}>
                <div>
                <div className={styles.images}></div>
                    <div className={styles.content}>
                        <h3>{Card_name}</h3>
                        <p>{Card_desc}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Service_cards;