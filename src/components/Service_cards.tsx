import Image from 'next/image'
import Link from "next/link";
import styles from '../styles/service_select.module.css';

import CardTemplate from "../../public/service_select/template_select.png";
import CardOriginal from "../../public/service_select/original.png";
import CardIllust from "../../public/service_select/illust.png";


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

const CARD_ITEM = [
    {
        href: "/template_select",
        name: "テンプレートケース",
        desc: "もう既にデザインが仕上がっているケース"
    },
    {
        href: "/scan",
        name: "オリジナルケース",
        desc: "写真を自由に入れることができるオリジナルのケース"
    },
    {
        href: "/device_select",
        name: "手書きケース",
        desc: "自販機で自分で書いたイラストをケースできる"
    },
]

// const IMG_ITEM = [
//     {
//         imgPath: ,
//         imgAlt: ,
//     }
// ]

const Service_cards = ()=> {
    return(
        <>
            <div className={styles.Container}>
                {/* 配列を繰り返し表示 */}
                {CARD_ITEM.map(item => {
                    return(
                        <Link key={item.href} href={item.href}>
                            <div className={styles.content}>
                                <div className={styles.images}></div>
                                <h3>{item.name}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    )
}

export default Service_cards;